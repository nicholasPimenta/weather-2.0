import styles from "./App.module.css";
import SearchForm from "./components/SearchForm/SearchForm";

function App() {
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
          <SearchForm />
        </div>
      </section>
    </main>
  );
}

export default App;
