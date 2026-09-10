import { ArrowLeftIcon } from "@phosphor-icons/react";
import styles from "./WeatherResult.module.css";
import { weatherMedia, type WeatherScene } from "./WeatherMedia";

export interface ForecastDay {
  id: string;
  nextDay: string;
  icon: string;
  condition: string;
  max: number;
  min: number;
}

export interface CurrentWeather {
  temperature: number;
  max: number;
  min: number;
  humidity: number;
  windSpeed: number;
  description: string;
  city: string;
  scene: WeatherScene;
}

interface WeatherResultProps {
  days: ForecastDay[];
  currentWeather: CurrentWeather;
}

function WeatherResult({ days, currentWeather }: WeatherResultProps) {

  const scene: WeatherScene = currentWeather.scene;
  const selectedMedia = weatherMedia[scene];

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
        src={selectedMedia.fallback}
        alt=""
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
        poster={selectedMedia.fallback}
        aria-hidden="true"
        key={scene}
      >
        <source src={selectedMedia.video} type="video/mp4" />
      </video>
      <div className={styles.weatherContent}>
        <div className={styles.weatherNow}>
          <h1 className={styles.title}>{currentWeather.city}</h1>
          <span className={styles.temp}>{currentWeather.temperature}°</span>
          <p className={styles.weatherStats}>{currentWeather.description}</p>
        </div>
        <dl className={styles.weatherDetails}>
          <div className={styles.detailItem}>
            <dt>Máx.</dt>
            <dd>{currentWeather.max}°</dd>
          </div>
          <div className={styles.detailItem}>
            <dt>Mín.</dt>
            <dd>{currentWeather.min}°</dd>
          </div>
          <div className={styles.detailItem}>
            <dt>Umidade</dt>
            <dd>{currentWeather.humidity}%</dd>
          </div>
          <div className={styles.detailItem}>
            <dt>Vento</dt>
            <dd>{currentWeather.windSpeed} km/h</dd>
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
