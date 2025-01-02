// types.ts

export interface SkiResort {
  // 唯一标识符
  resort_id: string;

  // 名称和地理信息
  name: string;
  country_code: string;
  region: string;
  latitude: number;
  longitude: number;

  // 海拔信息（可选）
  elevation?: {
    summit?: number; // 顶部海拔
    base?: number;   // 基部海拔
  };

  // 斜坡和雪道信息
  total_slopes: number; // 总雪道数量
  snow_parks: number;   // 雪公园数量
  night_skiing: number; // 夜间滑雪场数量
  ski_lifts: number;    // 滑雪缆车数量

  // 价格信息
  adult_day_pass: number; // 成人日票价格
  currency: string;       // 货币类型（如 USD, CAD 等）

  // 开放季节信息
  season_start: string; // 滑雪季开始日期（ISO 格式）
  season_end: string;   // 滑雪季结束日期（ISO 格式）

  // 图片 URL（可选）
  image_url?: string;

  // 当前天气信息（可选）
  currentWeather?: CurrentWeather;

  // 天气预报信息（可选）
  forecast?: Forecast[];

  // 天气机构信息
  weather_agency?: string;

  // 雪道描述
  slopes_description?: string;
}


export interface CurrentWeather {
  resort_id?: string;
  timestamp: number;
  temperature: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  weather_description: string;
  icon_id: string;
  uv_index: number;
  wind_gust: number;
  cloudiness: number;
}


export interface Forecast {
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
  precipitation_probability: number;
  weather_main: string;
  weather_description: string;
  snow_amount: number;
  rain_amount: number;
  conditions: {
    main: string;
    description: string;
    icon_id: string;
    precipitationProbability: number;
    snowAmount: number;
    rainAmount: number;
  };
  uv_index: number;
  cloudiness: number;
}


export interface WeatherData {
  currentWeather: CurrentWeather;
  forecast: Forecast[];
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

// 添加 WeatherForecastProps 接口
export interface WeatherForecastProps {
  weather: WeatherData | null;
}

// 添加 LoadingState 接口
export interface LoadingState {
  resort: boolean;
  weather: boolean;
}

// 添加 ErrorState 接口
export interface ErrorState extends Record<string, string> {}
