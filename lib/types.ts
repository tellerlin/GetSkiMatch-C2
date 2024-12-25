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

  // 雪道级别百分比
  beginner_percentage: number;     // 初级雪道百分比
  intermediate_percentage: number; // 中级雪道百分比
  advanced_percentage: number;     // 高级雪道百分比

  // 图片 URL（可选）
  image_url?: string;

  // 当前天气信息（可选）
  currentWeather?: CurrentWeather;

  // 天气预报信息（可选）
  forecast?: Forecast[];
}

// 当前天气接口
export interface CurrentWeather {
  resort_id: string;
  timestamp: number;             // Unix 时间戳
  temperature: number;           // 温度（摄氏度或华氏度）
  feels_like: number;            // 体感温度
  pressure: number;              // 气压（hPa）
  humidity: number;              // 湿度（%）
  weather_description: string;   // 天气描述（如 "Sunny", "Snowy" 等）
  uv_index: number;              // 紫外线指数
  wind_gust: number;             // 阵风速度（km/h 或 mph）
  cloudiness: number;            // 云量（%）
}

// 天气预报接口
export interface Forecast {
  date: string; // 预报日期（ISO 格式）

  // 温度信息
  temperature: {
    max: number;           // 最高温度
    min: number;           // 最低温度
    morn: number;          // 上午温度
    day: number;           // 白天天温度
    eve: number;           // 傍晚温度
    night: number;         // 夜间温度
    feelsLikeDay: number;  // 白天体感温度
    feelsLikeNight: number;// 夜间体感温度
  };

  // 风力信息
  wind: {
    speed: number;   // 风速
    deg: number;     // 风向（度数）
    gust: number;    // 阵风速度
    pressure: number; // 气压
  };

  // 天气条件
  conditions: {
    main: string;                     // 主要天气状况（如 "Rain", "Snow"）
    description: string;              // 天气详细描述
    precipitationProbability: number; // 降水概率（%）
    snowAmount: number;               // 降雪量（cm 或 inches）
    rainAmount: number;               // 降雨量（mm 或 inches）
    humidity: number;                 // 湿度（%）
    visibility: number;               // 能见度（米或英尺）
    sunrise: string;                  // 日出时间（ISO 格式）
    sunset: string;                    // 日落时间（ISO 格式）
  };

  uvIndex: number;      // 紫外线指数
  cloudiness: number;   // 云量（%）
}

export interface WeatherData {
  currentWeather?: {
    resort_id?: string;
    timestamp?: number;
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
      morn: number;
      day: number;
      eve: number;
      night: number;
      feelsLikeDay: number;
      feelsLikeNight: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
      pressure: number;
    };
    conditions: {
      main: string;
      description: string;
      precipitationProbability: number;
      snowAmount: number;
      rainAmount: number;
      humidity: number;
      visibility: number;
      sunrise: string;
      sunset: string;
    };
    uvIndex: number;
    cloudiness: number;
  }>;
}

export interface WeatherData {
  currentWeather?: {
    resort_id?: string;
    timestamp?: number;
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
      morn: number;
      day: number;
      eve: number;
      night: number;
      feelsLikeDay: number;
      feelsLikeNight: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
      pressure: number;
    };
    conditions: {
      main: string;
      description: string;
      precipitationProbability: number;
      snowAmount: number;
      rainAmount: number;
      humidity: number;
      visibility: number;
      sunrise: string;
      sunset: string;
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
export interface ErrorState {
  resort?: string;
  weather?: string;
  general?: string;
}
