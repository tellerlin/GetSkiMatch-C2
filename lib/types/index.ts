export interface SkiResort {
  resort_id: string;
  name: string;
  country_code: string;
  region: string;
  latitude: number;
  longitude: number;
  beginner_percentage: number;
  intermediate_percentage: number;
  advanced_percentage: number;
  total_slopes: number;
  snow_parks: number;
  night_skiing: number;
  ski_lifts: number;
  adult_day_pass: number;
  currency: string;
  season_start: string;
  season_end: string;
  image_url: string;
}

export interface WeatherData {
  currentWeather: {
    temperature: number;
    feels_like: number;
    weather_description: string;
    wind_gust: number;
    humidity: number;
    uv_index: number;
  };
  forecast: Array<{
    forecast_date: string;
    temperature_max: number;
    temperature_min: number;
    feels_like_day: number;
    feels_like_night: number;
    precipitation_probability: number;
    weather_description: string;
    snow_amount: number;
  }>;
}