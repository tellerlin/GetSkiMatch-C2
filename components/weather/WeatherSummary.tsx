import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, Snowflake, Wind } from 'lucide-react';

interface WeatherSummaryProps {
  weather: {
    current: {
      temp: number;
      feels_like: number;
      wind_speed: number;
    };
    daily: Array<{
      temp: {
        min: number;
        max: number;
      };
      snow?: number;
    }>;
    summary: {
      ai_generated: string;
      weekly_overview: string;
    };
  };
}

export default function WeatherSummary({ weather }: WeatherSummaryProps) {
  const hasSnowfall = weather.daily.some(day => day.snow && day.snow > 0);
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Current Conditions</h2>
        {hasSnowfall && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Snowflake className="h-4 w-4 mr-1" />
            Fresh Snow
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <Snowflake className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-medium">{weather.current.temp}°C</p>
            <p className="text-xs text-gray-500">Feels like {weather.current.feels_like}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <Wind className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-medium">{weather.current.wind_speed} m/s</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <Cloud className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Snow Forecast</p>
            <p className="font-medium">
              {weather.daily[0].snow ? `${weather.daily[0].snow}cm` : 'No snow'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">AI Weather Analysis</h3>
          <p className="text-sm text-gray-600">{weather.summary.ai_generated}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Weekly Overview</h3>
          <p className="text-sm text-gray-600">{weather.summary.weekly_overview}</p>
        </div>
      </div>
    </Card>
  );
}