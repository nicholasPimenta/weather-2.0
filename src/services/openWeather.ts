import { openWeatherApiKey } from "../config/env";

export interface GeocodingResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

const GEOCODING_ENDPOINT = "https://api.openweathermap.org/geo/1.0/direct";

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
