import { openWeatherApiKey } from "../config/env";

export interface GeocodingResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeatherResponse {
  weather: {  
    id: number;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const GEOCODING_ENDPOINT = "https://api.openweathermap.org/geo/1.0/direct";
const CURRENT_WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

export async function geocodeCity(city: string): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    q: city.trim(),
    limit: "1",
    appid: openWeatherApiKey,
  });

  const response = await fetch(
    `${GEOCODING_ENDPOINT}?${params}`,
  );

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  
  const data: GeocodingResult[] = await response.json();
  const [location] = data;

  if (!location) {
    throw new Error(`Cidade não encontrada: ${city}`);
  }

  return location;
}

export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherResponse> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    units: "metric",
    appid: openWeatherApiKey,
    lang: "pt_br",
  });

  const response = await fetch(
    `${CURRENT_WEATHER_ENDPOINT}?${params}`,
  );

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data: CurrentWeatherResponse = await response.json();

  return data;
}
