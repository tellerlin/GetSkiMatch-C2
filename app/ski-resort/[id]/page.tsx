import { Suspense } from 'react';
import ResortContent from '@/components/resort/ResortContent';
import WeatherSummary from '@/components/weather/WeatherSummary';
import WeatherAlert from '@/components/weather/WeatherAlert';
import { Loader2 } from 'lucide-react';
import { getResortById } from '@/lib/utils/resort-service';
import { getWeatherData } from '@/lib/utils/weather-service';

export async function generateStaticParams() {
  const resortIds = ['whistler-blackcomb', 'zermatt', 'niseko-united'];
  return resortIds.map((id) => ({ id }));
}

export default async function ResortDetailPage({ params }: { params: { id: string } }) {
  const [resort, weather] = await Promise.all([
    getResortById(params.id),
    getWeatherData(params.id)
  ]);

  if (!resort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Resort not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }>
        <ResortContent resort={resort} />
      </Suspense>

      {weather && (
        <>
          {weather.alerts?.map((alert, index) => (
            <WeatherAlert key={index} alert={alert} />
          ))}
          <WeatherSummary weather={weather} />
        </>
      )}
    </div>
  );
}