import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cloud, Thermometer, Wind, Droplets, Clock, Snowflake } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherInfoProps {
  weather: any;
}

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  if (!weather) return null;

  const isSnowing = weather.current.weather[0].main.toLowerCase().includes('snow');

  return (
    <Tabs defaultValue="current" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="current">Current</TabsTrigger>
        <TabsTrigger value="forecast">Forecast</TabsTrigger>
      </TabsList>

      <TabsContent value="current">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Thermometer className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="font-medium">{weather.current.temp}°C</p>
                  <p className="text-sm text-gray-500">
                    Feels like {weather.current.feels_like}°C
                  </p>
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

            <div className="space-y-4">
              {isSnowing && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Snowflake className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-800">Fresh Snow!</h3>
                  </div>
                  <p className="text-sm text-blue-700">
                    Perfect conditions for skiing with fresh powder snow.
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium mb-2">Today's Overview</h3>
                <p className="text-sm text-gray-600">
                  {weather.summary.ai_generated}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="forecast">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Hourly Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {weather.hourly.slice(0, 6).map((hour: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">
                        {format(new Date(hour.dt * 1000), 'HH:mm')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{hour.temp}°C</span>
                      {hour.snow && (
                        <Badge variant="secondary" className="bg-blue-100">
                          <Snowflake className="h-3 w-3 mr-1" />
                          {hour.snow['1h']}cm
                        </Badge>
                      )}
                      <Badge variant="secondary">
                        <Wind className="h-3 w-3 mr-1" />
                        {hour.wind_speed}m/s
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Weekly Overview</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  {weather.summary.weekly_overview}
                </p>
                {weather.daily[0].snow && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                    <Snowflake className="h-4 w-4" />
                    <span>Expected snowfall: {weather.daily[0].snow}cm</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}