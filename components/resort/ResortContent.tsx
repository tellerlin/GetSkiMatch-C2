'use client';

import React, { useState, useEffect } from 'react';
import { SkiResort, WeatherData } from 'lib/types';
import ResortHeader from './ResortHeader';
import TerrainOverview from './TerrainOverview';
import ResortFeatures from './ResortFeatures';
import ResortDetails from './ResortDetails';
import WeatherForecast from './WeatherForecast';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert';

// 日志初始化
console.log('ResortContent component loaded');

(() => {
  console.log('ResortContent immediate test log');
  console.log('Current environment:', process.env.NODE_ENV);
})();

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

interface ErrorState {
  resort?: string;
  weather?: string;
  general?: string;
}

// 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.group('Error Boundary Caught Error');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.groupEnd();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {this.state.error?.message || 'An unexpected error occurred'}
          </AlertDescription>
        </Alert>
      );
    }
    return this.props.children;
  }
}

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
    console.log('ResortContent mounted with initial data:', initialData);

    if (!initialData.resort || !initialData.resort.resort_id || !initialData.resort.name) {
      console.error('Invalid resort data structure:', initialData.resort);
      setError({ resort: 'Invalid resort data structure' });
      return;
    }

    performance.mark('resortContentMount');
  
    return () => {
      console.log('ResortContent unmounting');
      performance.measure('ResortContent Lifetime', 'resortContentMount');
    };
  }, [initialData]);

  // Loading state
  if (loading.resort || loading.weather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading resort information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (Object.keys(error).length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Resort Data</AlertTitle>
          <AlertDescription>
            {Object.entries(error).map(([key, message]) => (
              <div key={key} className="mt-1">
                <strong className="capitalize">{key}:</strong> {message}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <ResortHeader resort={resortData} />
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <TerrainOverview resort={resortData} />
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
                  <WeatherForecast weather={weather} />
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
