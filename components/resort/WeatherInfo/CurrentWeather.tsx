import { WeatherData } from '@/lib/types';
import WeatherMetric from './WeatherMetric';
import { Thermometer, Wind, CloudSun, Cloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CurrentWeatherProps {
  weather: WeatherData;
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  if (!weather.currentWeather) {
    return (
      <div className="text-center text-gray-500 py-6">
        <Cloud className="h-8 w-8 mx-auto mb-2" />
        <p>Current weather data is unavailable</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <WeatherMetric
          icon={<Thermometer className="h-5 w-5 text-blue-600" />}
          label="Temperature"
          value={`${weather.currentWeather.temperature}°C`}
          subValue={`Feels like ${weather.currentWeather.feels_like}°C`}
        />
        <WeatherMetric
          icon={<Wind className="h-5 w-5 text-blue-600" />}
          label="Wind"
          value={`${weather.currentWeather.wind_gust} m/s`}
        />
        <WeatherMetric
          icon={<CloudSun className="h-5 w-5 text-blue-600" />}
          label="Cloudiness"
          value={`${weather.currentWeather.cloudiness}%`}
        />
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Current Conditions</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.currentWeather.icon_id}@2x.png`}
              alt="Weather icon"
              className="w-6 h-6"
            />
            <Badge>
              {weather.currentWeather.weather_description}
            </Badge>
          </div>
          {weather.currentWeather.wind_gust > 15 && (
            <Badge variant="destructive">Strong Winds</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
