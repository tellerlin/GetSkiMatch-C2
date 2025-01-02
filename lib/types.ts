export interface SkiResort {
  resort_id: string;
  name: string;
  country_code: string;
  region: string;
  latitude: number;
  longitude: number;
  slopes_description?: string;
  total_slopes: number;
  snow_parks: number;
  night_skiing: 0 | 1;
  ski_lifts: number;
  adult_day_pass: number;
  currency: string;
  season_start: string;
  season_end: string;
  image_url?: string;
}


export interface ApiResponse {
  resort: {
    resort_id: string;
    name?: string;
    latitude: number;
    longitude: number;
  };
  weather: {
    current: CurrentWeather;
    daily: Forecast[];
  };
}


export interface CurrentWeather {
  timestamp: number;
  temperature: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  weather_description: string;
  uv_index: number;
  wind_gust: number;
  cloudiness: number;
  icon_id: string;
}


export interface Forecast {
  forecast_date: string;
  temperature_max: number;
  temperature_min: number;
  feels_like_day: number;
  feels_like_night: number;
  precipitation_probability: number;
  weather_main: string;
  weather_description: string;
  wind_speed: number;
  wind_direction: number;
  snow_amount: number;
  rain_amount: number;
  uv_index: number;
  wind_gust: number;
  cloudiness: number;
  conditions: {
    main: string;
    description: string;
    precipitationProbability: number;
    snowAmount: number;
    rainAmount: number;
    icon_id: string;
  };
}


export interface WeatherData {
  currentWeather: CurrentWeather;
  forecast: Forecast[];
}


export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}


export interface ResortApiResponse {
  resorts: SkiResort[];
  pagination: PaginationInfo;
}