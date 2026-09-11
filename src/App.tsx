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

type ViewPhase = "search" | "loading" | "result" | "returning" | "restoring";

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  );
  const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [viewPhase, setViewPhase] = useState<ViewPhase>("search");

  const handleEmptySearch = () => {
    setSearchError("Por favor, insira o nome de uma cidade.");
  };

  const handleSearch = async (city: string): Promise<void> => {
    setIsLoading(true);
    setViewPhase("loading");
    setSearchError(null);
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
      setViewPhase("result");
    } catch (error) {
      setViewPhase("search");
      if (error instanceof TypeError) {
        setSearchError(
          "Não foi possível conectar. Verifique sua internet e tente novamente.",
        );
      } else if (error instanceof Error) {
        setSearchError(error.message);
      } else {
        setSearchError("Ocorreu um erro desconhecido.");
      }

      console.error("Erro ao buscar as informações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const finishReturn = () => {
    setCurrentWeather(null);
    setForecastDays([]);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setViewPhase(prefersReducedMotion ? "search" : "restoring");
  };

  const handleBack = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishReturn();
      return;
    }

    setViewPhase("returning");
  };

  return (
    <main className={styles.weatherApp}>
      {(viewPhase === "search" ||
        viewPhase === "loading" ||
        viewPhase === "restoring") && (
        <section
          className={styles.searchView}
          aria-labelledby="app-title"
          data-phase={viewPhase}
        >
          <div
            className={styles.searchViewContent}
            onAnimationEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                viewPhase === "restoring"
              ) {
                setViewPhase("search");
              }
            }}
          >
            <div className={styles.searchViewTexts}>
              <h1 id="app-title" className={styles.title}>
                Weather 2.0
              </h1>
              <p className={styles.subtitle}>
                Pesquise uma cidade e entre na atmosfera.
              </p>
            </div>
            <SearchForm
              onSearch={handleSearch}
              isLoading={isLoading}
              onEmptySearch={handleEmptySearch}
            />
            {searchError && (
              <p className={styles.errorMessage} role="alert">
                {searchError}
              </p>
            )}
          </div>
        </section>
      )}
      {currentWeather &&
        (viewPhase === "result" || viewPhase === "returning") && (
          <WeatherResult
            days={forecastDays}
            currentWeather={currentWeather}
            onBack={handleBack}
            isReturning={viewPhase === "returning"}
            onReturnComplete={finishReturn}
          />
        )}
    </main>
  );
}

export default App;
