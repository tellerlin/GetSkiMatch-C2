import { Suspense } from 'react';
import { getFilteredResorts, getResortById } from '@/lib/utils/resort-service';
import { getWeatherData } from '@/lib/utils/weather-service';
import ResortHeader from '@/components/resort/ResortHeader';
import ResortDetails from '@/components/resort/ResortDetails';
import WeatherInfo from '@/components/weather/WeatherInfo';
import { Loader2 } from 'lucide-react';

// Generate static params for all resorts
export async function generateStaticParams() {
  const { resorts } = await getFilteredResorts({
    limit: 1000 // Get all resorts
  });
  
  return resorts.map((resort) => ({
    id: resort.resort_id
  }));
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
        <ResortHeader resort={resort} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ResortDetails resort={resort} />
            </div>
            <div>
              <WeatherInfo weather={weather} />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}