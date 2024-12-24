// Update types to match API response
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
  }>;
}

export interface Country {
  country_code: string;
  name: string;
  weather_agency: string;
  total_resorts: number;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type TerrainPreference = 'groomed' | 'powder' | 'park' | 'backcountry';

export interface UserPreferences {
  skillLevel: SkillLevel;
  terrainPreferences: TerrainPreference[];
  budgetRange: {
    min: number;
    max: number;
  };
  country: string;
}