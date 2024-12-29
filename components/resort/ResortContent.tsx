'use client';

import React, { useState, useEffect } from 'react';
import { SkiResort, WeatherData } from 'lib/types';
import ResortHeader from './ResortHeader';
import ResortFeatures from './ResortFeatures';
import ResortDetails from './ResortDetails';
import Weather from './Weather';
import LoadingState from 'components/common/LoadingState';
import ErrorState from 'components/common/ErrorState';

// 类型定义
interface ResortContentProps {
  initialData: {
    resort: SkiResort;
    currentWeather: WeatherData['currentWeather'] | null;
    forecast: WeatherData['forecast'] | null;
  };
  params: {
    id: string;
  };
}

interface LoadingState {
  resort: boolean;
  weather: boolean;
}

interface ErrorState extends Record<string, string> {}

import ErrorBoundary from 'components/common/ErrorBoundary';

export default function ResortContent({ initialData, params }: ResortContentProps) {
  const [resortData, setResortData] = useState<SkiResort>(initialData.resort);
  const [weather, setWeather] = useState<WeatherData | null>(
    initialData.currentWeather && initialData.forecast
      ? {
          currentWeather: initialData.currentWeather,
          forecast: initialData.forecast,
        }
      : null
  );
  const [loading, setLoading] = useState<LoadingState>({ resort: false, weather: false });
  const [error, setError] = useState<ErrorState>({});

  useEffect(() => {
    const fetchResortData = async () => {
      try {
        setLoading(prev => ({ ...prev, resort: true }));
        
        // If initial data is invalid, fetch fresh data
        if (!initialData.resort || !initialData.resort.resort_id || !initialData.resort.name) {
          const response = await fetch(`/api/resorts/${params.id}`);
          if (!response.ok) throw new Error('Failed to fetch resort data');
          
          const data = await response.json();
          setResortData(data.resort);
          if (data.weather) {
            setWeather({
              currentWeather: data.weather.current,
              forecast: data.weather.forecast
            });
          }
        } else {
          setResortData(initialData.resort);
          if (initialData.currentWeather && initialData.forecast) {
            setWeather({
              currentWeather: initialData.currentWeather,
              forecast: initialData.forecast
            });
          }
        }
      } catch (error) {
        setError({
          resort: 'Failed to load resort data',
          general: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      } finally {
        setLoading(prev => ({ ...prev, resort: false }));
      }
    };

    fetchResortData();
  }, [initialData, params.id]);

  // Loading state
  if (loading.resort || loading.weather) {
    return <LoadingState message="Loading resort information..." />;
  }

  // Error state
  if (Object.keys(error).length > 0) {
    return <ErrorState errors={error} title="Error Loading Resort Data" />;
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <ResortHeader resort={resortData} />
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ResortDetails 
                resort={resortData} 
                weather={weather}
              />
              <ResortFeatures resort={resortData} />
            </div>
          
            <div>
              {weather ? (
                <>
                  {weather.currentWeather?.timestamp && (
                    <div className="mb-2 text-xs text-gray-400">
                      Last updated: {new Date(weather.currentWeather.timestamp).toLocaleString()}
                    </div>
                  )}
                  <Weather weather={weather} />
                </>
              ) : (
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-700">
                    Weather data is currently unavailable
                  </p>
                  <p className="text-sm text-yellow-600 mt-1">
                    Please try again later
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
