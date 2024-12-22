'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SkiResort } from '@/lib/types';
import { getResortById } from '@/lib/utils/resort-service';
import { getWeatherData } from '@/lib/utils/weather-service';
import ResortHeader from '@/components/resort/ResortHeader';
import WeatherInfo from '@/components/resort/WeatherInfo';
import TerrainOverview from '@/components/resort/TerrainOverview';
import ResortFeatures from '@/components/resort/ResortFeatures';
import { Loader2 } from 'lucide-react';

export default function ResortDetailPage() {
  const { id } = useParams();
  const [resort, setResort] = useState<SkiResort | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResortData = async () => {
      try {
        if (typeof id === 'string') {
          const [resortData, weatherData] = await Promise.all([
            getResortById(id),
            getWeatherData(id)
          ]);
          
          if (resortData) {
            setResort(resortData);
            setWeather(weatherData);
          }
        }
      } catch (error) {
        console.error('Error loading resort data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResortData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!resort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Resort not found</p>
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
            <ResortFeatures resort={resort} />
          </div>
          
          <div className="space-y-8">
            <WeatherInfo weather={weather} />
          </div>
        </div>
      </div>
    </main>
  );
}