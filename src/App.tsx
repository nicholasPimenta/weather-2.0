import styles from "./App.module.css";
import SearchForm from "./components/SearchForm/SearchForm";
import { getWeatherScene } from "./components/WeatherResult/WeatherMedia";
import { prepareForecastDays, type ForecastDay } from "./utils/forecast";
import { useState } from "react";
import WeatherResult, {
  type CurrentWeather,
} from "./components/WeatherResult/WeatherResult";
import {
  geocodeCity,
  getCurrentWeather,
  getForecast,
} from "./services/openWeather";

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  );
  const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);

  const handleSearch = async (city: string): Promise<void> => {
    try {
      const location = await geocodeCity(city);
      const currentWeatherResponse = await getCurrentWeather(
        location.lat,
        location.lon,
      );
      const forecast = await getForecast(location.lat, location.lon);
      const scene = getWeatherScene(
        currentWeatherResponse.weather[0].id,
        currentWeatherResponse.dt,
        currentWeatherResponse.sys.sunrise,
        currentWeatherResponse.sys.sunset,
      );
      const preparedCurrentWeather: CurrentWeather = {
        temperature: Math.round(currentWeatherResponse.main.temp),
        max: Math.round(currentWeatherResponse.main.temp_max),
        min: Math.round(currentWeatherResponse.main.temp_min),
        humidity: currentWeatherResponse.main.humidity,
        windSpeed: Math.round(currentWeatherResponse.wind.speed * 3.6),
        description: currentWeatherResponse.weather[0].description.replace(
          /^./,
          (letter) => letter.toUpperCase(),
        ),
        city: location.name,
        scene,
      };
      const preparedForecastDays = prepareForecastDays(
        forecast,
        currentWeatherResponse.dt,
      );
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

  const handleBack = () => {
    setCurrentWeather(null);
    setForecastDays([]);
  };

  return (
    <main className={styles.weatherApp}>
      {currentWeather === null && (
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
      )}
      {currentWeather && (
        <WeatherResult
          days={forecastDays}
          currentWeather={currentWeather}
          onBack={handleBack}
        />
      )}
    </main>
  );
}

export default App;
