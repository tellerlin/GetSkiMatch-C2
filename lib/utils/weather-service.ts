const API_BASE_URL = 'https://ski-query-worker.3we.org';


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


// 添加到 validateWeatherData 函数
const validateWeatherData = (data: any): data is WeatherData => {
  if (!data) return false;

  // 验证 currentWeather
  const hasValidCurrentWeather = data.currentWeather && 
    typeof data.currentWeather.temperature === 'number' &&
    typeof data.currentWeather.feels_like === 'number' &&
    typeof data.currentWeather.wind_gust === 'number' &&
    typeof data.currentWeather.weather_description === 'string';

  // 验证 forecast
  const hasValidForecast = Array.isArray(data.forecast) &&
    data.forecast.every((day: any) => 
      day.date &&
      typeof day.temperature === 'object' &&
      typeof day.temperature.max === 'number' &&
      typeof day.temperature.min === 'number' &&
      typeof day.wind === 'object' &&
      typeof day.conditions === 'object'
    );

  return hasValidCurrentWeather && hasValidForecast;
};


export async function getWeatherData(resortId: string): Promise<WeatherData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // 根据API文档修改请求路径，使用 resort 端点获取天气数据
    const url = `${API_BASE_URL}/resort?id=${resortId}`;
    console.log('Fetching resort data from:', url);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('API response not ok:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    
    // 提取天气数据
    // Transform dates to ensure proper format
    const transformDates = (forecast: any[]) => {
      return forecast.map(day => ({
        ...day,
        date: new Date(day.date).toISOString()
      }));
    };

    const weatherData = {
      currentWeather: data.currentWeather,
      forecast: transformDates(data.forecast)
    };

    if (!validateWeatherData(weatherData)) {
      console.error('Invalid weather data format:', weatherData);
      return null;
    }

    return weatherData;

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('API request timed out');
      } else {
        console.error('Error fetching weather data:', error.message);
      }
    } else {
      console.error('Unknown error:', error);
    }
    return null;
  }
}
