import clearDayVideo from "../../assets/weather/clear-day.mp4";
import clearDayImg from "../../assets/weather/clear-day.webp";
import clearNightVideo from "../../assets/weather/clear-night.mp4";
import clearNightImg from "../../assets/weather/clear-night.webp";
import cloudyDayVideo from "../../assets/weather/cloudy-day.mp4";
import cloudyDayImg from "../../assets/weather/cloudy-day.webp";
import cloudyNightVideo from "../../assets/weather/cloudy-night.mp4";
import cloudyNightImg from "../../assets/weather/cloudy-night.webp";
import rainDayVideo from "../../assets/weather/rain-day.mp4";
import rainDayImg from "../../assets/weather/rain-day.webp";
import rainNightVideo from "../../assets/weather/rain-night.mp4";
import rainNightImg from "../../assets/weather/rain-night.webp";
import snowDayVideo from "../../assets/weather/snow-day.mp4";
import snowDayImg from "../../assets/weather/snow-day.webp";
import snowNightVideo from "../../assets/weather/snow-night.mp4";
import snowNightImg from "../../assets/weather/snow-night.webp";

export type WeatherCondition = "clear" | "cloudy" | "rain" | "snow";
export type DayPeriod = "day" | "night";

export type WeatherScene = `${WeatherCondition}-${DayPeriod}`;

interface WeatherMedia {
  video: string;
  fallback: string;
}

export const weatherMedia: Record<WeatherScene, WeatherMedia> = {
  "clear-day": {video: clearDayVideo,  fallback: clearDayImg},
  "clear-night": {video: clearNightVideo, fallback: clearNightImg},

  "cloudy-day": {video: cloudyDayVideo, fallback: cloudyDayImg},
  "cloudy-night": {video: cloudyNightVideo, fallback: cloudyNightImg},

  "rain-day": {video: rainDayVideo, fallback: rainDayImg},
  "rain-night": {video: rainNightVideo, fallback: rainNightImg},

  "snow-day": {video: snowDayVideo, fallback: snowDayImg},
  "snow-night": {video: snowNightVideo, fallback: snowNightImg},
};

export const getWeatherCondition = (weatherId: number): WeatherCondition => {
  if (weatherId >= 200 && weatherId < 600) {
    return "rain";
  }
  if (weatherId >= 600 && weatherId < 700) {
    return "snow";
  }
  if (weatherId >= 801 && weatherId < 805) {
    return "cloudy";
  }
  if (weatherId === 800) {
    return "clear";
  }
  return "cloudy";
};

export const getDayPeriod = (currentTime: number, sunrise: number, sunset: number): DayPeriod => {
  if (currentTime >= sunrise && currentTime < sunset) {
    return "day";
  }
  return "night";
};

export const getWeatherScene = (weatherId: number, currentTime: number, sunrise: number, sunset: number): WeatherScene => {
  const condition = getWeatherCondition(weatherId);
  const period = getDayPeriod(currentTime, sunrise, sunset);
  return `${condition}-${period}`;
};