const API_BASE_URL = 'https://ski-query-worker.3we.org';

export async function getWeatherData(resortId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/resort?id=${resortId}`);
    const data = await response.json();
    
    if (data.error) {
      return null;
    }
    
    return {
      currentWeather: data.currentWeather,
      forecast: data.forecast
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}