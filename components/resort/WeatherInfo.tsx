import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cloud, Thermometer, Wind, Sun, Snowflake,
  AlertTriangle, CloudSun, Droplets
} from 'lucide-react';
import { format } from 'date-fns';
import { memo } from 'react';
import { WeatherData } from '@/lib/types';

interface WeatherInfoProps {
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

const WeatherInfo = memo(({ weather, isLoading, error }: WeatherInfoProps) => {
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

  const formatTemperature = (temp: number) => Math.round(temp * 10) / 10;
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  const getSkiingConditionsBadge = (conditions: {
    snowAmount: number;
    rainAmount: number;
    precipitationProbability: number;
  }) => {
    if (conditions.snowAmount > 20) return { label: 'Fresh Powder', color: 'bg-blue-500' };
    if (conditions.snowAmount > 10) return { label: 'Good Skiing', color: 'bg-green-500' };
    if (conditions.rainAmount > 0) return { label: 'Wet Conditions', color: 'bg-yellow-500' };
    if (conditions.precipitationProbability > 50) return { label: 'Precipitation Likely', color: 'bg-yellow-500' };
    return { label: 'Fair', color: 'bg-gray-500' };
  };

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

  const ForecastSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">5-Day Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weather.forecast.map((day, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {format(new Date(day.date), 'MMM dd')}
                </span>
                <Badge className={getSkiingConditionsBadge(day.conditions).color}>
                  {getSkiingConditionsBadge(day.conditions).label}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Thermometer className="h-4 w-4" />
                  <span>
                    {formatTemperature(day.temperature.max)}°C / {formatTemperature(day.temperature.min)}°C
                  </span>
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
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full" role="region" aria-label="Weather Information">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
            <CurrentWeatherSection />
          </Card>
        </TabsContent>

        <TabsContent value="forecast">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
            <ForecastSection />
          </Card>
        </TabsContent>
      </Tabs>
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

WeatherInfo.displayName = 'WeatherInfo';
WeatherMetric.displayName = 'WeatherMetric';

export default WeatherInfo;
