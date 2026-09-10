import { getWeatherCondition, weatherIcons } from "../components/WeatherResult/WeatherMedia";
import type { ForecastItem, ForecastResponse } from "../services/openWeather";

export interface ForecastDay {
  id: string;
  nextDay: string;
  icon: string;
  condition: string;
  max: number;
  min: number;
}

export function getLocalDateKey(dt: number, timezone: number): string {
    const date = new Date((dt + timezone) * 1000);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function prepareForecastDays(forecast: ForecastResponse, currentTime: number): ForecastDay[] {
    const currentDateKey = getLocalDateKey(currentTime, forecast.city.timezone);
    return forecast.list
        .reduce((acc: ForecastDay[], item: ForecastItem) => {
            const dateKey = getLocalDateKey(item.dt, forecast.city.timezone);
            const existingDay = acc.find((day) => day.id === dateKey);
            if (existingDay) {
                existingDay.max = Math.max(existingDay.max, item.main.temp_max);
                existingDay.min = Math.min(existingDay.min, item.main.temp_min);
                return acc;
            }
            const nextDay = new Date((item.dt + forecast.city.timezone) * 1000)
                .toLocaleDateString("pt-BR", { weekday: "short", timeZone: "UTC" })
                .toUpperCase()
                .replace(".", "");
            const weatherCondition = getWeatherCondition(item.weather[0].id);
            const icon = weatherIcons[weatherCondition];
            const condition = item.weather[0].description;
            acc.push({
                id: dateKey,
                nextDay,
                icon,
                condition,
                max: item.main.temp_max,
                min: item.main.temp_min,
            });
            return acc;
        }, [])
        .filter((day) => day.id !== currentDateKey)
        .slice(0, 4)
        .map((day) => ({
            ...day,
            max: Math.round(day.max),
            min: Math.round(day.min),
        }));
}