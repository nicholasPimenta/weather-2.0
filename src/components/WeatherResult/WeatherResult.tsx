import { ArrowLeftIcon } from "@phosphor-icons/react";
import styles from "./WeatherResult.module.css";

interface ForecastDay {
  id: string;
  nextDay: string;
  icon: string;
  condition: string;
  max: number;
  min: number;
}

interface WeatherResultProps {
  days: ForecastDay[];
}

function WeatherResult({ days }: WeatherResultProps) {
  return (
    <section className={styles.weatherMain}>
      <button
        type="button"
        className={styles.backButton}
        aria-label="Voltar para a pesquisa"
      >
        <ArrowLeftIcon size={32} aria-hidden="true" weight="light" />
      </button>
      <div className={styles.weatherContent}>
        <div className={styles.weatherNow}>
          <h1 className={styles.title}>Vitória</h1>
          <span className={styles.temp}>24°</span>
          <p className={styles.weatherStats}>Chuva leve</p>
        </div>
        <dl className={styles.weatherDetails}>
          <div className={styles.detailItem}>
            <dt>Máx.</dt>
            <dd>26°</dd>
          </div>
          <div className={styles.detailItem}>
            <dt>Mín.</dt>
            <dd>21°</dd>
          </div>
          <div className={styles.detailItem}>
            <dt>Umidade</dt>
            <dd>87%</dd>
          </div>
          <div className={styles.detailItem}>
            <dt>Vento</dt>
            <dd>18 km/h</dd>
          </div>
        </dl>
        <ul className={styles.weatherNextDays}>
          {days.map((day) => (
            <li className={styles.nextDayContent} key={day.id}>
              <time className={styles.titleDay} dateTime={day.id}>
                {day.nextDay}
              </time>
              <img
                src={day.icon}
                alt={day.condition}
                className={styles.iconWeather}
              />
              <dl className={styles.maxMin}>
                <div>
                  <dt className={styles.visuallyHidden}>Máxima</dt>
                  <dd>{day.max}°</dd>
                </div>
                <div>
                  <dt className={styles.visuallyHidden}>Mínima</dt>
                  <dd className={styles.minMuted}>{day.min}°</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WeatherResult;
