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

const validateWeatherData = (data: any): data is WeatherData => {
  if (!data) return false;

  const hasValidCurrentWeather = data.currentWeather && 
    typeof data.currentWeather.temperature === 'number' &&
    typeof data.currentWeather.feels_like === 'number' &&
    typeof data.currentWeather.wind_gust === 'number' &&
    typeof data.currentWeather.weather_description === 'string';

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

    const url = `${API_BASE_URL}/resort?id=${resortId}`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    
    const weatherData = {
      currentWeather: data.currentWeather,
      forecast: data.forecast.map((day: any) => ({
        ...day,
        date: new Date(day.date).toISOString()
      }))
    };

    return validateWeatherData(weatherData) ? weatherData : null;

  } catch (error) {
    return null;
  }
}