import { Card } from '@/components/ui/card';
import { Thermometer, Wind, Cloud } from 'lucide-react';
import { WeatherData } from '@/lib/types';

interface WeatherInfoProps {
  weather: WeatherData | null;
}

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  if (!weather?.currentWeather) return null;

  const { currentWeather, forecast } = weather;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Thermometer className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-medium">{currentWeather.temperature}°C</p>
            <p className="text-xs text-gray-500">
              Feels like {currentWeather.feels_like}°C
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Wind className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Wind</p>
            <p className="font-medium">{currentWeather.wind_gust} m/s</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Cloud className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Conditions</p>
            <p className="font-medium capitalize">
              {currentWeather.weather_description}
            </p>
          </div>
        </div>
      </div>

      {forecast && forecast.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Forecast</h3>
          <div className="space-y-2">
            {forecast.slice(0, 3).map((day, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{new Date(day.forecast_date).toLocaleDateString()}</span>
                <div className="text-right">
                  <span className="text-blue-600">{day.temperature_min}°</span>
                  {' - '}
                  <span className="text-red-600">{day.temperature_max}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}