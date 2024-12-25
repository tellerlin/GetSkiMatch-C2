'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SkiResort } from '@/lib/types';
import { getResortById } from '@/lib/utils/resort-service';
import { getWeatherData, type WeatherData } from '@/lib/utils/weather-service';
import ResortHeader from './ResortHeader';
import WeatherInfo from './WeatherInfo';
import TerrainOverview from './TerrainOverview';
import ResortFeatures from './ResortFeatures';
import ResortDetails from './ResortDetails';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoadingState {
  resort: boolean;
  weather: boolean;
}

interface ErrorState {
  resort?: string;
  weather?: string;
  general?: string;
}

export default function ResortContent() {
  const { id } = useParams();
  const [resort, setResort] = useState<SkiResort | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ resort: true, weather: true });
  const [error, setError] = useState<ErrorState>({});

  // 修改数据加载逻辑
  useEffect(() => {
    const loadResortData = async () => {
      if (typeof id !== 'string') {
        setError({ general: 'Invalid resort ID' });
        setLoading({ resort: false, weather: false });
        return;
      }

      try {
        setError({});
        setLoading({ resort: true, weather: true });

        // 由于天气数据现在包含在 resort 数据中,只需要一次请求
        const resortData = await getResortById(id);
        console.log('Resort data fetched:', resortData);

        if (resortData) {
          setResort(resortData);
          // 提取天气数据
          if (resortData.currentWeather && resortData.forecast) {
            setWeather({
              currentWeather: resortData.currentWeather,
              forecast: resortData.forecast
            });
          } else {
            setError(prev => ({ ...prev, weather: 'Weather data unavailable' }));
          }
        } else {
          setError(prev => ({ ...prev, resort: 'Resort not found' }));
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error('Error in loadResortData:', errorMessage);
        setError(prev => ({ ...prev, general: errorMessage }));
      } finally {
        setLoading({ resort: false, weather: false });
      }
    };

    loadResortData();
  }, [id]);

  if (loading.resort || loading.weather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (Object.keys(error).length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {Object.values(error).map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!resort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="default" className="max-w-md">
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            The requested resort information could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <ResortHeader resort={resort} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TerrainOverview resort={resort} />
            <ResortDetails resort={resort} weather={weather} />
            <ResortFeatures resort={resort} />
          </div>
          
          <div className="space-y-8">
            <WeatherInfo 
              weather={weather} 
              isLoading={loading.weather}
              error={error.weather}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
