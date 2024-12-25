// WeatherForecast.tsx
import { WeatherData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
import { 
  CloudSnow, 
  Thermometer, 
  Wind, 
  Sun, 
  Droplets,
  AlertTriangle 
} from 'lucide-react';

// 辅助函数
const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
};

const isValidISODate = (dateString: string): boolean => {
  try {
    console.log('Validating date string:', dateString);
    const date = parseISO(dateString);
    const isValid = !isNaN(date.getTime());
    console.log('Date validation result:', {
      dateString,
      parsedDate: date,
      isValid
    });
    return isValid;
  } catch (error) {
    console.error('Date validation error:', error);
    return false;
  }
};

const formatDateSafely = (dateString: string, formatString: string = 'EEE, MMM d'): string => {
  try {
    if (!isValidISODate(dateString)) {
      console.warn('Invalid date string:', dateString);
      return 'Invalid Date';
    }

    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, formatString);
    
    console.log('Date formatting result:', {
      input: dateString,
      parsedDate,
      formattedDate
    });

    return formattedDate;
  } catch (error) {
    console.error('Date formatting error:', {
      input: dateString,
      formatString,
      error
    });
    return 'Invalid Date';
  }
};

interface WeatherForecastProps {
  weather: WeatherData | null;
}

export default function WeatherForecast({ weather }: WeatherForecastProps) {
  console.log('WeatherForecast rendered:', {
    hasWeather: !!weather,
    hasForecast: !!weather?.forecast,
    forecastLength: weather?.forecast?.length
  });

  useEffect(() => {
    console.log('Weather data changed:', {
      currentWeather: weather?.currentWeather,
      forecastCount: weather?.forecast?.length
    });
  }, [weather]);

  if (!weather?.forecast || weather.forecast.length === 0) {
    console.warn('No forecast data available:', weather);
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <CloudSnow className="h-12 w-12 mx-auto mb-2" />
          <p>Forecast information is currently unavailable</p>
          <p className="text-sm mt-2 text-gray-400">
            Debug info: {JSON.stringify({
              hasWeather: !!weather,
              hasForecast: !!weather?.forecast,
              forecastLength: weather?.forecast?.length
            })}
          </p>
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
      <h2 className="text-xl font-semibold mb-6">
        8-Day Forecast
        <span className="text-sm text-gray-400 ml-2">
          ({weather.forecast.length} days available)
        </span>
      </h2>
      <div className="space-y-4">
        {weather.forecast.map((day, index) => {
          console.log('Processing forecast day:', {
            index,
            date: day.date,
            fullData: day
          });

          const conditionBadge = getConditionBadge(day.conditions);
          const formattedDate = formatDateSafely(day.date);

          const temperature = day.temperature || {};
          const wind = day.wind || {};
          const conditions = day.conditions || {};

          return (
            <div 
              key={index} 
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{formattedDate}</span>
                <Badge className={conditionBadge.color}>
                  {conditionBadge.label}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Temperature Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Thermometer className="h-4 w-4" />
                    <span>Temperature</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {temperature.max?.toFixed(1) || 'N/A'}°C / {temperature.min?.toFixed(1) || 'N/A'}°C
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Feels like {temperature.feelsLikeDay?.toFixed(1) || 'N/A'}°C</p>
                    </div>
                  </div>
                </div>

                {/* Wind Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Wind className="h-4 w-4" />
                    <span>Wind</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {wind.speed?.toFixed(1) || 'N/A'} m/s
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Direction: {getWindDirection(wind.deg || 0)}</p>
                      {wind.gust > (wind.speed || 0) * 1.5 && (
                        <p>Gusts up to {wind.gust?.toFixed(1) || 'N/A'} m/s</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Precipitation Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Droplets className="h-4 w-4" />
                    <span>Precipitation</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {(conditions.precipitationProbability * 100)?.toFixed(0) || 'N/A'}%
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      {conditions.snowAmount > 0 && (
                        <p className="text-blue-600">
                          Snow: {conditions.snowAmount?.toFixed(1) || 'N/A'}mm
                        </p>
                      )}
                      {conditions.rainAmount > 0 && (
                        <p className="text-green-600">
                          Rain: {conditions.rainAmount?.toFixed(1) || 'N/A'}mm
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* UV & Visibility Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Sun className="h-4 w-4" />
                    <span>UV & Visibility</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      UV Index: {day.uvIndex || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather Alerts */}
              {(conditions.snowAmount > 20 || wind.gust > 15) && (
                <div className="mt-2 p-2 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-700">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {conditions.snowAmount > 20 ? 'Heavy snowfall expected' : 'Strong winds expected'}
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
