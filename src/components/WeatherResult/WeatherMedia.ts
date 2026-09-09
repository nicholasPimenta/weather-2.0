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
