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
  night_skiing: 0 | 1;
  ski_lifts: number;
  adult_day_pass: number;
  currency: string;
  season_start: string;
  season_end: string;
  image_url?: string;
}

export interface WeatherData {
  currentWeather: {
    resort_id: string;
    timestamp: number;
    temperature: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    weather_description: string;
    uv_index: number;
    wind_gust: number;
    cloudiness: number;
  };
  forecast: Array<{
    date: string;
    temperature: {
      max: number;
      min: number;
      feelsLikeDay: number;
      feelsLikeNight: number;
    };
    wind: {
      speed: number;
      direction: number;
      gust: number;
    };
    conditions: {
      main: string;
      description: string;
      precipitationProbability: number;
      snowAmount: number;
      rainAmount: number;
    };
    uvIndex: number;
    cloudiness: number;
  }>;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ResortFilters {
  name?: string;
  country_code?: string;
  region?: string;
  total_slopes_min?: number;
  total_slopes_max?: number;
  snow_parks_min?: number;
  snow_parks_max?: number;
  ski_lifts_min?: number;
  ski_lifts_max?: number;
  adult_day_pass_min?: number;
  adult_day_pass_max?: number;
  night_skiing?: 0 | 1;
  season_start?: string;
  season_end?: string;
  page?: number;
  limit?: number;
}