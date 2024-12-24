import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WeatherChart from './WeatherChart';
import { Cloud, Snowflake, Wind, Sun } from 'lucide-react';

interface WeatherSummaryProps {
  currentWeather?: {
    temperature: number;
    feels_like: number;
    wind_gust: number;
    weather_description: string;
    humidity: number;
    uv_index: number;
  };
  forecast?: Array<{
    forecast_date: string;
    temperature_max: number;
    temperature_min: number;
    snow_amount: number;
    weather_description: string;
  }>;
}

export default function WeatherSummary({ currentWeather, forecast }: WeatherSummaryProps) {
  if (!currentWeather || !forecast) {
    return null;
  }

  const totalSnowfall = forecast
    .reduce((sum, day) => sum + (day.snow_amount || 0), 0)
    .toFixed(1);
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Current Conditions</h2>
          {Number(totalSnowfall) > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Snowflake className="h-4 w-4 mr-1" />
              {totalSnowfall}cm Snow Expected
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <Sun className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="font-medium">{currentWeather.temperature}°C</p>
              <p className="text-xs text-gray-500">
                Feels like {currentWeather.feels_like}°C
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <Wind className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Wind</p>
              <p className="font-medium">{currentWeather.wind_gust} m/s</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <Cloud className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Conditions</p>
              <p className="font-medium capitalize">
                {currentWeather.weather_description}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <WeatherChart forecast={forecast} />
    </div>
  );
}