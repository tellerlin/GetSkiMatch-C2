import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cloud, Thermometer, Wind, Droplets, AlertTriangle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherInfoProps {
  weather: any;
}

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  if (!weather) return null;

  return (
    <Tabs defaultValue="current" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="current">Current</TabsTrigger>
        <TabsTrigger value="forecast">Forecast</TabsTrigger>
        <TabsTrigger value="alerts">Alerts</TabsTrigger>
      </TabsList>

      <TabsContent value="current">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
          
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

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">AI Overview</h3>
            <p className="text-sm text-gray-600">
              {weather.summary.ai_generated}
            </p>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="forecast">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Hourly Forecast</h3>
              <div className="space-y-3">
                {weather.hourly.slice(0, 6).map((hour: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">
                        {format(new Date(hour.dt * 1000), 'HH:mm')}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{hour.temp}°C</span>
                      {hour.snow && (
                        <span className="ml-2 text-blue-600">
                          {hour.snow['1h']}cm/h
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Weekly Overview</h3>
              <p className="text-sm text-gray-600">
                {weather.summary.weekly_overview}
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="alerts">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Weather Alerts</h2>
          
          <div className="space-y-4">
            {weather.alerts ? (
              weather.alerts.map((alert: any, index: number) => (
                <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-medium text-yellow-800">{alert.event}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {alert.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-yellow-600">
                      From: {format(new Date(alert.start * 1000), 'PPp')}
                    </Badge>
                    <Badge variant="outline" className="text-yellow-600">
                      To: {format(new Date(alert.end * 1000), 'PPp')}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No current weather alerts</p>
            )}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}