import styles from "./App.module.css";
import SearchForm from "./components/SearchForm/SearchForm";
import { getWeatherCondition, getWeatherScene, weatherIcons } from "./components/WeatherResult/WeatherMedia";
import { getLocalDateKey } from "./utils/forecast";
import { useState } from "react";
import WeatherResult, {
  type CurrentWeather,
  type ForecastDay,
} from "./components/WeatherResult/WeatherResult";
import {
  geocodeCity,
  getCurrentWeather,
  getForecast,
  type ForecastItem,
} from "./services/openWeather";

function App() {

  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  );
  const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);

  const handleSearch = async (city: string): Promise<void> => {
    try {
      const { lat, lon } = await geocodeCity(city);
      const currentWeatherResponse = await getCurrentWeather(lat, lon);
      const forecast = await getForecast(lat, lon);
      const scene = getWeatherScene(
        currentWeatherResponse.weather[0].id,
        currentWeatherResponse.dt,
        currentWeatherResponse.sys.sunrise,
        currentWeatherResponse.sys.sunset,
      );
      const currentDateKey = getLocalDateKey(
        currentWeatherResponse.dt,
        forecast.city.timezone,
      );
      const preparedCurrentWeather: CurrentWeather = {
        temperature: Math.round(currentWeatherResponse.main.temp),
        max: Math.round(currentWeatherResponse.main.temp_max),
        min: Math.round(currentWeatherResponse.main.temp_min),
        humidity: currentWeatherResponse.main.humidity,
        windSpeed: Math.round(currentWeatherResponse.wind.speed * 3.6),
        description: currentWeatherResponse.weather[0].description.replace(/^./, (letter) => letter.toUpperCase()),
        city: currentWeatherResponse.name,
        scene,
      };
      const preparedForecastDays = forecast.list
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
      setCurrentWeather(preparedCurrentWeather);
      setForecastDays(preparedForecastDays);
      console.log("Panorama meteorológico:", {
        currentWeather: preparedCurrentWeather,
        forecast,
        scene,
        forecastDays: preparedForecastDays,
      });
    } catch (error) {
      console.error("Erro ao buscar as informações:", error);
    }
  };

  return (
    <main className={styles.weatherApp}>
      <section className={styles.searchView} aria-labelledby="app-title">
        <div className={styles.searchViewContent}>
          <div className={styles.searchViewTexts}>
            <h1 id="app-title" className={styles.title}>
              Weather 2.0
            </h1>
            <p className={styles.subtitle}>
              Pesquise uma cidade e entre na atmosfera.
            </p>
          </div>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>
      {currentWeather && (
        <WeatherResult days={forecastDays} currentWeather={currentWeather} />
      )}
    </main>
  );
}

export default App;
