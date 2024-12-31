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
    icon_id: string;
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
      icon_id: string;
      precipitationProbability: number;
      snowAmount: number;
      rainAmount: number;
    };
    uvIndex: number;
    cloudiness: number;
  }>;
}

export async function getWeatherData(resortId: string): Promise<WeatherData> {
  try {
    const response = await fetch(`${API_BASE_URL}/resort?id=${resortId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!validateWeatherData(data)) {
      throw new Error('Invalid weather data structure received from API');
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

const validateWeatherData = (data: any): data is WeatherData => {
  if (!data) return false;

  const hasValidCurrentWeather = data.currentWeather && 
    typeof data.currentWeather.temperature === 'number' &&
    typeof data.currentWeather.feels_like === 'number' &&
    typeof data.currentWeather.wind_gust === 'number' &&
    typeof data.currentWeather.weather_description === 'string' &&
    (data.currentWeather.icon_id === undefined || typeof data.currentWeather.icon_id === 'string');

  const hasValidForecast = Array.isArray(data.forecast) &&
    data.forecast.every((day: any) => 
      day.date &&
      typeof day.temperature === 'object' &&
      typeof day.temperature.max === 'number' &&
      typeof day.temperature.min === 'number' &&
      typeof day.wind === 'object' &&
      typeof day.conditions === 'object' &&
      (day.conditions.icon_id === undefined || typeof day.conditions.icon_id === 'string')
    );

  return hasValidCurrentWeather && hasValidForecast;
}
