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

interface ApiResponse {
  resort: {
    resort_id: string;
    name: string;
    country_code: string;
    region: string;
    latitude: number;
    longitude: number;
  };
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

function parseApiResponse(responseText: string): ApiResponse {
  try {
    // First attempt to parse the response directly
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Initial parse failed, attempting to fix malformed JSON...');
    
    // Attempt to fix common malformed patterns
    const fixedText = responseText
      // Fix missing commas between key-value pairs
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      // Fix missing commas between objects in arrays
      .replace(/}([^}\[\],])/g, '},$1')
      // Fix malformed nested structures
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      // Fix malformed array structures
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      // Fix malformed JSON structure
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      // Additional fixes for specific patterns
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      // Fix malformed JSON structure
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2')
      .replace(/"([^"]+)"([^"{}\[\],:])/g, '"$1",$2');

    try {
      return JSON.parse(fixedText);
    } catch (finalError) {
      console.error('Failed to parse even after fixing:', finalError);
      // As a last resort, try parsing the response as a JSON array
      try {
        return JSON.parse(`[${fixedText}]`);
      } catch (arrayError) {
        console.error('Failed to parse as JSON array:', arrayError);
        throw new Error('Unable to parse malformed JSON response');
      }
    }
  }
}

function transformWeatherData(apiResponse: ApiResponse): WeatherData {
  return {
    currentWeather: apiResponse.currentWeather,
    forecast: apiResponse.forecast.map(day => ({
      date: day.date,
      temperature: day.temperature,
      wind: day.wind,
      conditions: day.conditions,
      uvIndex: day.uvIndex,
      cloudiness: day.cloudiness
    }))
  };
}

export async function getWeatherData(resortId: string): Promise<WeatherData> {
  try {
    const response = await fetch(`${API_BASE_URL}/resort?id=${resortId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const responseText = await response.text();
    const apiResponse = JSON.parse(responseText) as ApiResponse;

    if (!apiResponse.currentWeather || !apiResponse.forecast) {
      throw new Error('Invalid API response structure');
    }

    return transformWeatherData(apiResponse);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(`Failed to get weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
