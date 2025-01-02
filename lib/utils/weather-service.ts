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
    uv_index: number;
    cloudiness: number;
  }>;
}

interface ApiResponse {
  data: {
    resort: {
      resort_id: string;
      name: string;
      latitude: number;
      longitude: number;
      country_code?: string;
      region?: string;
      slopes_description?: string;
      total_slopes?: number;
      snow_parks?: number;
      night_skiing?: number;
      ski_lifts?: number;
      adult_day_pass?: number;
      currency?: string;
      season_start?: string;
      season_end?: string;
      image_url?: string;
    };
    weather: {
      current: {
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
      daily: Array<{
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
        conditions: {
          main: string;
          description: string;
          precipitationProbability: number;
          snowAmount: number;
          rainAmount: number;
          icon_id: string;
        };
      }>;
    };
  };
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


export async function getWeatherData(resortId: string): Promise<WeatherData> {
  try {
    const response = await fetch(`${API_BASE_URL}/resort?id=${resortId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    const responseText = await response.text();
    console.log('Raw API Response:', responseText);


    let apiResponse: ApiResponse;
    try {
      apiResponse = JSON.parse(responseText) as ApiResponse;
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      throw new Error('Failed to parse API response');
    }


    // 验证必要的字段
    if (!apiResponse.currentWeather || !apiResponse.forecast) {
      console.error('Invalid API Response Structure:', apiResponse);
      throw new Error('Invalid API response structure: weather data missing');
    }


    return transformWeatherData(apiResponse);
  } catch (error) {
    console.error('Complete Error Details:', error);
    throw new Error(`Failed to get weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}


function transformWeatherData(apiResponse: ApiResponse): WeatherData {
  return {
    currentWeather: {
      resort_id: apiResponse.resort.resort_id,
      timestamp: apiResponse.currentWeather.timestamp,
      temperature: apiResponse.currentWeather.temperature,
      feels_like: apiResponse.currentWeather.feels_like,
      pressure: apiResponse.currentWeather.pressure,
      humidity: apiResponse.currentWeather.humidity,
      weather_description: apiResponse.currentWeather.weather_description,
      icon_id: apiResponse.currentWeather.icon_id, // 直接使用 API 返回的 icon_id
      uv_index: apiResponse.currentWeather.uv_index,
      wind_gust: apiResponse.currentWeather.wind_gust,
      cloudiness: apiResponse.currentWeather.cloudiness
    },
    forecast: apiResponse.forecast.map(day => ({
      date: day.date,
      temperature: {
        max: day.temperature.max,
        min: day.temperature.min,
        feelsLikeDay: day.temperature.feelsLikeDay,
        feelsLikeNight: day.temperature.feelsLikeNight
      },
      wind: {
        speed: day.wind.speed,
        direction: day.wind.direction,
        gust: day.wind.gust
      },
      conditions: {
        main: day.conditions.main,
        description: day.conditions.description,
        icon_id: day.conditions.icon_id, // 直接使用 API 返回的 icon_id
        precipitationProbability: day.conditions.precipitationProbability,
        snowAmount: day.conditions.snowAmount,
        rainAmount: day.conditions.rainAmount
      },
      uv_index: day.uvIndex,
      cloudiness: day.cloudiness
    }))
  };
}