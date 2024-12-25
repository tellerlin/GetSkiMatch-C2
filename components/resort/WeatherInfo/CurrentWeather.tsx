import { WeatherData } from '@/lib/types';
import WeatherMetric from './WeatherMetric';
import { Thermometer, Wind, CloudSun } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CurrentWeatherProps {
  weather: WeatherData;
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
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
          <Badge className="mr-2">
            {weather.currentWeather.weather_description}
          </Badge>
          {weather.currentWeather.wind_gust > 15 && (
            <Badge variant="destructive">Strong Winds</Badge>
          )}
        </div>
      </div>
    </div>
  );
}