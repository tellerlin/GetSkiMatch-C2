export interface SkiResort {
  resort_id: string;
  name: string;
  country_code: string;
  region: string;
  elevation: {
    summit: number;
    base: number;
  };
  total_slopes: number;
  snow_parks: number;
  night_skiing: number;
  ski_lifts: number;
  adult_day_pass: number;
  currency: string;
  season_start: string;
  season_end: string;
  image_url?: string;
}

export interface WeatherData {
  currentWeather: {
    temperature: {
      current: number;
      feels_like: number;
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

export interface Country {
  country_code: string;
  name: string;
  weather_agency: string;
  total_resorts: number;
}

export interface ResortFilters {
  country_code?: string;
  region?: string;
  name?: string;
  total_slopes_min?: number;
  total_slopes_max?: number;
  snow_parks_min?: number;
  snow_parks_max?: number;
  ski_lifts_min?: number;
  ski_lifts_max?: number;
  adult_day_pass_min?: number;
  adult_day_pass_max?: number;
  night_skiing?: number;
  season_start?: string;
  season_end?: string;
  page?: number;
  limit?: number;
}
