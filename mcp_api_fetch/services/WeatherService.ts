import { config } from "../config/env";
import { CityNotFoundError } from "../Errors/WeatherError";
import { Weather } from "../types/types";

export async function getWeather(city: string): Promise<Weather> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${config.OPENWEATHER_API}&units=metric`,
  );

  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new CityNotFoundError(city);

      case 401:
        throw new Error("Invalid API key.");

      default:
        throw new Error("Weather service is unavailable.");
    }
  }

  const data = await response.json();

  return {
    city: data.name,
    lat: data.coord.lat,
    lon: data.coord.lon,
    weather: data.weather[0].main,
    description: data.weather[0].description,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}
