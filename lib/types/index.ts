export interface UserPreferences {
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredTerrain: string[];
  maxPrice: number;
  nightSkiing: boolean;
  snowParks: boolean;
  minSlopes: number;
  minLifts: number;
  budgetRange: {
    min: number;
    max: number;
  };
  terrainPreferences: ('groomed' | 'powder' | 'park' | 'backcountry')[];
}


export interface SkiResort {
  resort_id: string;
  name: string;
  country_code: string;
  region: string;
  latitude: number;
  longitude: number;
  slopes_description?: string;  // 新增
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
    timestamp: number;
    temperature: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    weather_description: string;
    uv_index: number;
    wind_gust: number;
    cloudiness: number;
    icon_id: string;  // 新增
  };
  forecast: Array<{
    forecast_date: string;  // 改为 forecast_date
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
      icon_id: string;  // 新增
    };
  }>;
}


export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface CountryInfo {
  country_code: string;
  weather_agency?: string;
}

export interface ResortFilters {
  name?: string;
  country_code?: string[];
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
