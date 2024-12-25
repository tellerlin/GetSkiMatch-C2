import { WeatherData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { 
  CloudSnow, 
  Thermometer, 
  Wind, 
  Sun, 
  Droplets,
  AlertTriangle 
} from 'lucide-react';

interface WeatherForecastProps {
  weather: WeatherData | null;
}

export default function WeatherForecast({ weather }: WeatherForecastProps) {
  if (!weather?.forecast || weather.forecast.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <CloudSnow className="h-12 w-12 mx-auto mb-2" />
          <p>Forecast information is currently unavailable</p>
        </div>
      </Card>
    );
  }

  const getConditionBadge = (conditions: {
    main: string;
    description: string;
    precipitationProbability: number;
    snowAmount: number;
    rainAmount: number;
  }) => {
    if (conditions.snowAmount > 20) {
      return { label: 'Heavy Snow', color: 'bg-blue-600 text-white' };
    }
    if (conditions.snowAmount > 5) {
      return { label: 'Snow', color: 'bg-blue-500 text-white' };
    }
    if (conditions.rainAmount > 0) {
      return { label: 'Rain', color: 'bg-yellow-500 text-white' };
    }
    if (conditions.precipitationProbability > 0.5) {
      return { label: 'Precipitation Likely', color: 'bg-gray-600 text-white' };
    }
    return { label: 'Fair', color: 'bg-green-600 text-white' };
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">8-Day Forecast</h2>
      <div className="space-y-4">
        {weather.forecast.map((day, index) => {
          const date = new Date(day.date);
          const conditionBadge = getConditionBadge(day.conditions);

          return (
            <div 
              key={index} 
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{format(date, 'EEE, MMM d')}</span>
                <Badge className={conditionBadge.color}>
                  {conditionBadge.label}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Thermometer className="h-4 w-4" />
                    <span>Temperature</span>
                  </div>
                  <p className="font-medium">
                    {day.temperature.max.toFixed(1)}°C / {day.temperature.min.toFixed(1)}°C
                    <span className="block text-sm text-gray-500">
                      Feels like {day.temperature.feelsLikeDay.toFixed(1)}°C
                    </span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Wind className="h-4 w-4" />
                    <span>Wind</span>
                  </div>
                  <p className="font-medium">
                    {day.wind.speed.toFixed(1)} m/s
                    {day.wind.gust > day.wind.speed * 1.5 && (
                      <span className="block text-sm text-gray-500">
                        Gusts up to {day.wind.gust.toFixed(1)} m/s
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Droplets className="h-4 w-4" />
                    <span>Precipitation</span>
                  </div>
                  <p className="font-medium">
                    {(day.conditions.precipitationProbability * 100).toFixed(0)}%
                    {day.conditions.snowAmount > 0 && (
                      <span className="block text-sm text-blue-600 font-medium">
                        Snow: {day.conditions.snowAmount.toFixed(1)}mm
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Sun className="h-4 w-4" />
                    <span>UV & Visibility</span>
                  </div>
                  <p className="font-medium">
                    UV Index: {day.uvIndex}
                    <span className="block text-sm text-gray-500">
                      Cloud Cover: {day.cloudiness}%
                    </span>
                  </p>
                </div>
              </div>

              {(day.conditions.snowAmount > 20 || day.wind.gust > 15) && (
                <div className="mt-2 p-2 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-700">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {day.conditions.snowAmount > 20 ? 'Heavy snowfall expected' : 'Strong winds expected'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}