import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getFilteredResorts, getResortById } from '@/lib/utils/resort-service';
import { getWeatherData } from '@/lib/utils/weather-service';
import type { WeatherData } from '@/lib/utils/weather-service';
import ResortHeader from '@/components/resort/ResortHeader';
import ResortDetails from '@/components/resort/ResortDetails';
import WeatherInfo from '@/components/weather/WeatherInfo';
import { Loader2 } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

// Generate static params for all resorts
export async function generateStaticParams() {
  try {
    console.log('Generating static params for all resorts');
    const { resorts } = await getFilteredResorts({
      limit: 1000 // Get all resorts
    });
    
    console.log(`Generated params for ${resorts.length} resorts`);
    return resorts.map((resort) => ({
      id: resort.resort_id
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  try {
    console.log('Generating metadata for resort ID:', params.id);
    const resort = await getResortById(params.id);

    if (!resort) {
      console.log('Resort not found for metadata generation');
      return {
        title: 'Resort Not Found',
        description: 'The requested ski resort could not be found.'
      };
    }

    return {
      title: `${resort.name} - Ski Resort Details`,
      description: `Discover ${resort.name} ski resort in ${resort.region}, ${resort.country}.`
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the resort details.'
    };
  }
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

export default async function ResortDetailPage({ params }: PageProps) {
  try {
    console.log('Fetching data for resort ID:', params.id);
    
    // 并行获取数据
    const [resortData, weatherData] = await Promise.all([
      getResortById(params.id).then(resort => {
        console.log('Resort data received:', resort);
        return resort;
      }),
      getWeatherData(params.id).then(weather => {
        console.log('Weather data received:', weather);
        return weather;
      })
    ]);

    // 验证resort数据
    if (!resortData) {
      console.error('Resort data not found');
      notFound();
    }

    // 验证关键字段
    if (!resortData.name || !resortData.resort_id) {
      console.error('Invalid resort data - missing required fields:', resortData);
      return <ErrorState message="Invalid resort data" />;
    }

    return (
      <div className="space-y-8">
        <Suspense fallback={<LoadingState />}>
          <ResortHeader resort={resortData} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ResortDetails 
                  resort={resortData} 
                  weather={weatherData}
                  isLoading={false} 
                />
              </div>
              <div>
                {weatherData ? (
                  <WeatherInfo weather={weatherData} />
                ) : (
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Weather Information</h2>
                    <p className="text-gray-500">
                      Weather information is currently unavailable
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error in ResortDetailPage:', error);
    return <ErrorState message="Error loading resort details" />;
  }
}
