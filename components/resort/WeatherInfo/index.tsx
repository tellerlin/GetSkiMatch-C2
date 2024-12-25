'use client';

import { WeatherData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CurrentWeather from './CurrentWeather';
import ForecastDay from './ForecastDay';

interface WeatherInfoProps {
  weather: WeatherData | null;
}

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  if (!weather) return null;

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
            <CurrentWeather weather={weather} />
          </Card>
        </TabsContent>

        <TabsContent value="forecast">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weather.forecast.map((day, index) => (
                <ForecastDay key={day.date} day={day} />
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}