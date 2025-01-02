import { ApiResponse, WeatherData, CurrentWeather } from '../types';


const API_BASE_URL = 'https://ski-query-worker.3we.org';


export async function getWeatherData(resortId: string): Promise<WeatherData> {
  try {
    console.log(`Fetching weather data for resort: ${resortId}`);
    
    // 记录完整的 API 请求 URL
    const apiUrl = `${API_BASE_URL}/resort?id=${resortId}`;
    console.log(`API Request URL: ${apiUrl}`);


    // 记录请求开始时间
    const startTime = Date.now();


    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 如果有额外的请求头，可以在这里添加
      }
    });


    // 记录请求耗时
    const endTime = Date.now();
    console.log(`Request duration: ${endTime - startTime}ms`);


    // 记录响应状态
    console.log(`Response status: ${response.status}`);
    console.log(`Response headers: ${JSON.stringify(Object.fromEntries(response.headers))}`)


    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    // 记录原始响应文本
    const rawText = await response.text();
    console.log('Raw API Response Text:', rawText);


    // 尝试解析 JSON
    let apiResponse;
    try {
      apiResponse = JSON.parse(rawText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      throw new Error('Failed to parse API response');
    }


    // 记录解析后的响应
    console.log('Parsed API Response:', JSON.stringify(apiResponse, null, 2));
    
    return transformWeatherData(apiResponse);
  } catch (error) {
    console.error('Complete error details:', error);
    throw error;
  }
}

export function transformWeatherData(apiResponse: any): WeatherData {
  console.log('Transforming API Response:', JSON.stringify(apiResponse, null, 2));


  // 根据实际 API 返回结构调整转换逻辑
  if (!apiResponse.weather) {
    console.error('Unexpected API response structure', apiResponse);
    return {
      currentWeather: {} as CurrentWeather,
      forecast: []
    };
  }


  return {
    currentWeather: apiResponse.weather.current || {} as CurrentWeather,
    forecast: apiResponse.weather.daily || []
  };
}