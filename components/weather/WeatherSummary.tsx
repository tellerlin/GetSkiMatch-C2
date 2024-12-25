import { WeatherData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CloudSnow, Wind, Sun } from 'lucide-react';

interface WeatherSummaryProps {
  weather: WeatherData | null;
}

export default function WeatherSummary({ weather }: WeatherSummaryProps) {
  if (!weather) return null;

  const totalSnowfall = weather.forecast
    .reduce((sum, day) => sum + day.conditions.snowAmount, 0)
    .toFixed(1);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Weather Overview</h2>
        {Number(totalSnowfall) > 0 && (
          <Badge className="bg-blue-100 text-blue-800">
            <CloudSnow className="h-4 w-4 mr-1 inline" />
            {totalSnowfall}mm Snow Expected
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {weather.forecast.slice(0, 3).map((day, index) => {
          const date = new Date(day.date);
          return (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">
                  {format(date, 'EEE, MMM d')}
                </span>
                <div className="flex items-center gap-1 text-gray-600">
                  <Wind className="h-4 w-4" />
                  <span>{day.wind.speed.toFixed(1)} m/s</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {day.temperature.max.toFixed(1)}°C / {day.temperature.min.toFixed(1)}°C
                </div>
                {day.conditions.snowAmount > 0 && (
                  <span className="text-sm text-blue-600">
                    Snow: {day.conditions.snowAmount.toFixed(1)}mm
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}