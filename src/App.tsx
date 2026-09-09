import styles from "./App.module.css";
import SearchForm from "./components/SearchForm/SearchForm";
import rainIcon from "@meteocons/svg-static/monochrome/rain.svg"
import WeatherResult from "./components/WeatherResult/WeatherResult";
import { geocodeCity } from "./services/openWeather";

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
      const results = await geocodeCity(city);
      console.log(results);
    } catch (error) {
      console.error(error);
    };
  }

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
      <WeatherResult days={forecastDays} />
    </main>
  );
}

export default App;
