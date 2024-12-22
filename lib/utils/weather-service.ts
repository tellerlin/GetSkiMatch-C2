import mockWeather from '@/data/mock-weather.json';

export async function getWeatherData(resortId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return mockWeather[resortId as keyof typeof mockWeather] || null;
}