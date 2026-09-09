import { ArrowLeftIcon } from "@phosphor-icons/react";
import styles from "./WeatherResult.module.css";
import clearDayVideo from "../../assets/weather/clear-day.mp4";
import clearDayFallback from "../../assets/weather/clear-day.png";

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
      <div className={styles.gradient} aria-hidden="true"></div>
      <button
        type="button"
        className={styles.backButton}
        aria-label="Voltar para a pesquisa"
      >
        <ArrowLeftIcon size={32} aria-hidden="true" weight="light" />
      </button>
      <img
        src={clearDayFallback}
        alt="Clima de Céu Limpo"
        className={styles.weatherFallback}
        aria-hidden="true"
      />
      <video
        className={styles.weatherVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={clearDayFallback}
        aria-hidden="true"
      >
        <source src={clearDayVideo} type="video/mp4" />
      </video>
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
