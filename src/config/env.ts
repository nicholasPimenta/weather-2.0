const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!openWeatherApiKey) {
  throw new Error("A chave da OpenWeather não foi configurada.");
}

export { openWeatherApiKey };