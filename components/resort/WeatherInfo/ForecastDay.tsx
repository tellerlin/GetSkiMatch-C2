import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Thermometer, Wind, Droplets, Sun, AlertTriangle } from 'lucide-react';

interface ForecastDayProps {
  day: {
    date: string;
    temperature: {
      max: number;
      min: number;
    };
    wind: {
      speed: number;
      gust: number;
    };
    conditions: {
      precipitationProbability: number;
      snowAmount: number;
    };
    uvIndex: number;
  };
}

export default function ForecastDay({ day }: ForecastDayProps) {
  const getConditionBadge = (snowAmount: number, windSpeed: number) => {
    if (snowAmount > 20) return { label: 'Fresh Powder', color: 'bg-blue-500' };
    if (snowAmount > 10) return { label: 'Good Skiing', color: 'bg-green-500' };
    if (windSpeed > 15) return { label: 'Strong Winds', color: 'bg-yellow-500' };
    return { label: 'Fair', color: 'bg-gray-500' };
  };

  const badge = getConditionBadge(day.conditions.snowAmount, day.wind.speed);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">
          {format(new Date(day.date), 'MMM dd')}
        </span>
        <Badge className={badge.color}>{badge.label}</Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Thermometer className="h-4 w-4" />
          <span>{day.temperature.max}°C / {day.temperature.min}°C</span>
        </div>

        <div className="flex items-center justify-between">
          <Wind className="h-4 w-4" />
          <span>
            {day.wind.speed}m/s
            <span className="text-sm text-gray-500 ml-1">
              (gusts {day.wind.gust}m/s)
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Droplets className="h-4 w-4" />
          <span>{day.conditions.precipitationProbability}% precipitation</span>
        </div>

        <div className="flex items-center justify-between">
          <Sun className="h-4 w-4" />
          <span>UV Index: {day.uvIndex}</span>
        </div>
      </div>

      {(day.conditions.snowAmount > 20 || day.wind.speed > 15) && (
        <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
          <AlertTriangle className="h-4 w-4 inline mr-1 text-yellow-500" />
          {day.conditions.snowAmount > 20 ? 'Heavy Snowfall Expected' : 'Strong Winds Expected'}
        </div>
      )}
    </Card>
  );
}