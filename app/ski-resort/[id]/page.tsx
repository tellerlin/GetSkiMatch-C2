import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getFilteredResorts, getResortById } from 'lib/utils/resort-service';
import { getWeatherData } from 'lib/utils/weather-service';
import ResortContent from 'components/resort/ResortContent';
import { SkiResort, WeatherData } from 'lib/types';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

// Generate static params (保持不变)
export async function generateStaticParams() {
  try {
    console.log('Generating static params for all resorts');
    const { resorts } = await getFilteredResorts({
      limit: 1000
    });
  
    console.log(`Generated params for ${resorts.length} resorts`);
    return resorts.map((resort: SkiResort) => ({
      id: resort.resort_id
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Metadata generation (保持不变)
export async function generateMetadata({ params }: PageProps): Promise<{
  title: string;
  description: string;
}> {
  try {
    console.log('Generating metadata for resort ID:', params.id);
    const resort = await getResortById(params.id);

    if (!resort) {
      return {
        title: 'Resort Not Found',
        description: 'The requested ski resort could not be found.'
      };
    }

    return {
      title: `${resort.name} - Ski Resort Details`,
      description: `Discover ${resort.name} ski resort in ${resort.region}, ${resort.country_code}.`
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the resort details.'
    };
  }
}

// Loading component
function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-500">Loading resort information...</p>
      </div>
    </div>
  );
}

// Error component
function ErrorState({ message, error }: { message: string; error?: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Resort</AlertTitle>
        <AlertDescription>
          <p>{message}</p>
          {error && process.env.NODE_ENV === 'development' && (
            <p className="mt-2 text-sm opacity-75">{error.message}</p>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Main page component
export default async function ResortDetailPage({ params }: PageProps) {
  try {
    console.log('Fetching data for resort ID:', params.id);
  
    const [resortData, weatherData] = await Promise.all([
      getResortById(params.id) as Promise<SkiResort | null>,
      getWeatherData(params.id) as Promise<WeatherData | null>
    ]);

    console.log('Resort data:', resortData);
    console.log('Weather data:', weatherData);

    if (!resortData) {
      console.error('Resort not found for ID:', params.id);
      notFound();
    }

    if (!resortData.resort_id || !resortData.name) {
      console.error('Invalid resort data structure:', resortData);
      throw new Error('Invalid resort data structure');
    }

    const completeData = {
      resort: resortData,
      currentWeather: weatherData?.currentWeather || null,
      forecast: weatherData?.forecast || null
    };

    return (
      <Suspense fallback={<LoadingState />}>
        <ResortContent 
          initialData={completeData}
          params={params}
        />
      </Suspense>
    );

  } catch (error) {
    console.error('Error in ResortDetailPage:', error);
    return (
      <ErrorState 
        message="Failed to load resort details" 
        error={error instanceof Error ? error : new Error('Unknown error')} 
      />
    );
  }
}
