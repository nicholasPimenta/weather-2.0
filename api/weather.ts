/// <reference types="node" />

const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org";

interface GeocodingResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export default {
  async fetch(request: Request) {
    if (request.method !== "GET") {
      return Response.json(
        { message: "Método não permitido." },
        {
          status: 405,
          headers: { Allow: "GET" },
        },
      );
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return Response.json(
        { message: "Serviço de clima não configurado." },
        { status: 500 },
      );
    }

    const requestUrl = new URL(request.url);
    const city = requestUrl.searchParams.get("city")?.trim();

    if (!city) {
      return Response.json(
        { message: "Informe o nome de uma cidade." },
        { status: 400 },
      );
    }

    try {
      const geocodingParams = new URLSearchParams({
        q: city,
        limit: "1",
        appid: apiKey,
      });

      const geocodingResponse = await fetch(
        `${OPEN_WEATHER_BASE_URL}/geo/1.0/direct?${geocodingParams}`,
      );

      if (!geocodingResponse.ok) {
        return Response.json(
          {
            message:
              "O serviço de clima está indisponível no momento. Tente novamente em instantes.",
          },
          { status: 502 },
        );
      }

      const locations = (await geocodingResponse.json()) as GeocodingResult[];

      const [location] = locations;

      if (!location) {
        return Response.json(
          {
            message: "Cidade não encontrada. Confira o nome e tente novamente.",
          },
          { status: 404 },
        );
      }

      const weatherParams = new URLSearchParams({
        lat: location.lat.toString(),
        lon: location.lon.toString(),
        units: "metric",
        appid: apiKey,
        lang: "pt_br",
      });

      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        fetch(`${OPEN_WEATHER_BASE_URL}/data/2.5/weather?${weatherParams}`),
        fetch(`${OPEN_WEATHER_BASE_URL}/data/2.5/forecast?${weatherParams}`),
      ]);

      if (!currentWeatherResponse.ok || !forecastResponse.ok) {
        return Response.json(
          {
            message:
              "O serviço de clima está indisponível no momento. Tente novamente em instantes.",
          },
          { status: 502 },
        );
      }

      const [currentWeather, forecast] = await Promise.all([
        currentWeatherResponse.json(),
        forecastResponse.json(),
      ]);

      return Response.json({
        location,
        currentWeather,
        forecast,
      });
    } catch (error) {
      console.error("Erro ao consultar a OpenWeather:", error);

      return Response.json(
        {
          message:
            "O serviço de clima está indisponível no momento. Tente novamente em instantes.",
        },
        { status: 502 },
      );
    }
  },
};
