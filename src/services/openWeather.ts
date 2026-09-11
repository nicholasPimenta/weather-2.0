export interface GeocodingResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeatherResponse {
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  weather: {  
    id: number;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

export interface ForecastItem {
  dt: number;
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: {
      id: number;
      description: string;
      icon: string;
    }[];
}
export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    timezone: number;
  };
}

interface ApiErrorResponse {
  message?: string;
}

export interface WeatherApiResponse {
  location: GeocodingResult;
  currentWeather: CurrentWeatherResponse;
  forecast: ForecastResponse;
}

const WEATHER_ENDPOINT = "/api/weather";

export async function getWeatherByCity(
  city: string,
): Promise<WeatherApiResponse> {
  const params = new URLSearchParams({
    city: city.trim(),
  });

  const response = await fetch(`${WEATHER_ENDPOINT}?${params}`);

  const data = (await response.json()) as
    | WeatherApiResponse
    | ApiErrorResponse;

  if (!response.ok) {
    const message =
      "message" in data && data.message
        ? data.message
        : "Não foi possível consultar o clima.";

    throw new Error(message);
  }

  return data as WeatherApiResponse;
}