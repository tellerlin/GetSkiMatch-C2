import { Card } from '@/components/ui/card';
import { Cloud, Thermometer, Wind, Droplets } from 'lucide-react';

interface WeatherInfoProps {
  weather: any;
}

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  if (!weather) return null;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Thermometer className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-medium">{weather.current.temp}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Wind className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-medium">{weather.current.wind_speed} m/s</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Droplets className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-medium">{weather.current.humidity}%</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">3-Day Forecast</h3>
        <div className="space-y-3">
          {weather.daily.slice(0, 3).map((day: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Day {index + 1}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{day.temp.min}°C to {day.temp.max}°C</span>
                {day.snow && (
                  <span className="ml-2 text-blue-600">
                    {day.snow}cm snow
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}