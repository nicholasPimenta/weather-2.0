import styles from "./App.module.css";
import SearchForm from "./components/SearchForm/SearchForm";
import rainIcon from "@meteocons/svg-static/monochrome/rain.svg";
import WeatherResult from "./components/WeatherResult/WeatherResult";
import { geocodeCity, getCurrentWeather, getForecast } from "./services/openWeather";
import { getWeatherScene } from "./components/WeatherResult/WeatherMedia";

function App() {

  const forecastDays = [
  {
    id: "2026-09-08",
    nextDay: "TER",
    icon: rainIcon,
    condition: "Chuva",
    max: 26,
    min: 21,
  },
  {
    id: "2026-09-09",
    nextDay: "QUA",
    icon: rainIcon,
    condition: "Chuva",
    max: 25,
    min: 21,
  },
  {
    id: "2026-09-10",
    nextDay: "QUI",
    icon: rainIcon,
    condition: "Chuva",
    max: 26,
    min: 21,
  },
  {
    id: "2026-09-11",
    nextDay: "SEX",
    icon: rainIcon,
    condition: "Chuva",
    max: 26,
    min: 21,
  },
];

  const handleSearch = async (city: string): Promise<void> => {
    try {
      const { lat, lon } = await geocodeCity(city);
      const currentWeather = await getCurrentWeather(lat, lon);
      const forecast = await getForecast(lat, lon);
      const scene = getWeatherScene(currentWeather.weather[0].id, currentWeather.dt, currentWeather.sys.sunrise, currentWeather.sys.sunset);
      console.log("Panorama meteorológico:", {
        currentWeather, 
        forecast, 
        scene
      });
    } catch (error) {
      console.error("Erro ao buscar as informações:", error);
    }
  };

  const mockCurrentWeather = {
    temperature: 25,
    max: 26,
    min: 21,
    humidity: 80,
    windSpeed: 18,
    description: "Chuva",
    city: "São Paulo",
    scene: "rain-day" as const,
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
      <WeatherResult days={forecastDays} currentWeather={mockCurrentWeather} />
    </main>
  );
}

export default App;
