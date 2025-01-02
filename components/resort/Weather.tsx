'use client';

import { Card } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { 
  Cloud, Thermometer, Wind, Sun, Snowflake,
  AlertTriangle, CloudSun, Droplets,
  CloudRain, CloudSnow, CloudLightning,
  CloudDrizzle, Haze
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { memo, useEffect } from 'react';
import { WeatherData } from 'lib/types';

interface WeatherProps {
  weather: WeatherData | null;
  isLoading?: boolean;
  error?: string;
}

interface WeatherMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

const Weather = memo(({ weather, isLoading, error }: WeatherProps) => {
  // 辅助函数
  const formatTemperature = (temp: number) => Math.round(temp * 10) / 10;
  
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  const getConditionBadge = (conditions: {
    snowAmount: number;
    rainAmount: number;
    precipitationProbability: number;
  }) => {
    if (conditions.snowAmount > 20) return { label: 'Heavy Snow', color: 'bg-blue-600 text-white' };
    if (conditions.snowAmount > 10) return { label: 'Good Skiing', color: 'bg-green-500 text-white' };
    if (conditions.rainAmount > 0) return { label: 'Wet Conditions', color: 'bg-yellow-500 text-white' };
    if (conditions.precipitationProbability > 50) return { label: 'Precipitation Likely', color: 'bg-yellow-500 text-white' };
    return { label: 'Fair', color: 'bg-gray-500 text-white' };
  };


  const getWeatherIcon = (icon_id: string) => {
    return <img 
      src={`https://openweathermap.org/img/wn/${icon_id}@2x.png`}
      alt="Weather icon"
      className="h-12 w-12"
    />;
  };

  const formatDateSafely = (dateString: string, formatString: string = 'EEE, MMM d'): string => {
    try {
      const parsedDate = parseISO(dateString);
      return format(parsedDate, formatString);
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  // 加载状态
  if (isLoading) {
    return (
      <section className="w-full p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </section>
    );
  }

  // 错误状态
  if (error) {
    return (
      <section className="w-full p-6 text-center" role="alert">
        <div className="text-red-500 mb-2">
          <Cloud className="h-12 w-12 mx-auto mb-2" />
          <p className="font-medium">{error}</p>
        </div>
        <p className="text-gray-600">Please check your connection or try again later</p>
      </section>
    );
  }

  // 无数据状态
  if (!weather) {
    return (
      <section className="w-full p-6 text-center">
        <div className="text-gray-500">
          <Cloud className="h-12 w-12 mx-auto mb-2" />
          <p>Weather information is currently unavailable</p>
        </div>
      </section>
    );
  }

  // 当前天气部分
  const CurrentWeatherSection = () => {
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
            value={`${formatTemperature(weather.currentWeather.temperature)}°C`}
            subValue={`Feels like ${formatTemperature(weather.currentWeather.feels_like)}°C`}
          />
        <WeatherMetric
          icon={<Wind className="h-5 w-5 text-blue-600" />}
          label="Wind Gust"
          value={`${weather.currentWeather.wind_gust} m/s`}
        />
        <WeatherMetric
          icon={<CloudSun className="h-5 w-5 text-blue-600" />}
          label="Cloudiness"
          value={`${weather.currentWeather.cloudiness}%`}
        />
        </div>

        <div className="space-y-4">
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
      </div>
    );
  };

  // 天气预报部分
  const ForecastSection = () => {
    if (!weather.forecast || weather.forecast.length === 0) {
      return (
        <div className="text-center text-gray-500 py-6">
          <Cloud className="h-8 w-8 mx-auto mb-2" />
          <p>Forecast data is unavailable</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">8-Day Forecast</h3>
          <div className="space-y-4">
            {weather.forecast.map((day, index) => {
              const conditionBadge = getConditionBadge(day.conditions);
              const formattedDate = formatDateSafely(day.date);

              return (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{formattedDate}</span>
                    <Badge className={conditionBadge.color}>
                      {conditionBadge.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    {getWeatherIcon(day.conditions.icon_id)}
                    <div>
                      <p className="font-medium capitalize">{day.conditions.description}</p>
                      <p className="text-sm text-gray-600">Conditions</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <WeatherMetric
                      icon={<Thermometer className="h-4 w-4" />}
                      label="Temperature"
                      value={`${formatTemperature(day.temperature.max)}°C / ${formatTemperature(day.temperature.min)}°C`}
                    />
                    <WeatherMetric
                      icon={<Wind className="h-4 w-4" />}
                      label="Wind"
                      value={`${day.wind.speed} m/s`}
                      subValue={`Gusts ${day.wind.gust} m/s`}
                    />
                    <WeatherMetric
                      icon={<Droplets className="h-4 w-4" />}
                      label="Precipitation"
                      value={`${(day.conditions.precipitationProbability * 100).toFixed(0)}%`}
                    />

                    <WeatherMetric
                      icon={<Sun className="h-4 w-4" />}
                      label="UV Index"
                      value={day.uv_index ? day.uv_index.toString() : 'N/A'} // 添加安全检查
                    />

                  </div>

                  {(day.conditions.snowAmount > 20 || day.wind.gust > 15) && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
                      <AlertTriangle className="h-4 w-4 inline mr-1 text-yellow-500" />
                      {day.conditions.snowAmount > 20 ? 'Heavy Snowfall Expected' : 'Strong Winds Expected'}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full" role="region" aria-label="Weather Information">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
        <ForecastSection />
      </Card>
    </section>
  );
});

const WeatherMetric = memo(({ icon, label, value, subValue }: WeatherMetricProps) => (
  <div className="flex items-center gap-3" role="group" aria-label={label}>
    {icon}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium">{value}</p>
      {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
    </div>
  </div>
));

Weather.displayName = 'Weather';
WeatherMetric.displayName = 'WeatherMetric';

export default Weather;
