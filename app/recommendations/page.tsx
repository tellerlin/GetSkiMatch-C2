'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SkiResort, UserPreferences } from '@/lib/types';
import { calculateMatchScore } from '@/lib/utils/recommendations';
import { getRecommendations } from '@/lib/utils/resort-service';
import { getWeatherData } from '@/lib/utils/weather-service';
import ResortCard from '@/components/ResortCard';
import { Loader2, CloudSnow, Thermometer } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function RecommendationsPage() {
  const searchParams = useSearchParams();
  const [recommendations, setRecommendations] = useState<Array<SkiResort & { matchScore: number }>>([]);
  const [weatherData, setWeatherData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const preferencesParam = searchParams.get('preferences');
        if (preferencesParam) {
          const preferences: UserPreferences = JSON.parse(preferencesParam);
          const results = await getRecommendations(preferences);
          
          // Fetch weather data for all resorts
          const weatherPromises = results.map(resort => getWeatherData(resort.id));
          const weatherResults = await Promise.all(weatherPromises);
          
          const weatherMap = results.reduce((acc, resort, index) => {
            acc[resort.id] = weatherResults[index];
            return acc;
          }, {} as Record<string, any>);
          
          setWeatherData(weatherMap);
          setRecommendations(results);
        }
      } catch (error) {
        console.error('Error loading recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [searchParams]);

  const getWeatherSummary = () => {
    const resorts = recommendations.filter(r => weatherData[r.id]);
    if (resorts.length === 0) return null;

    const snowyResorts = resorts.filter(r => 
      weatherData[r.id].current.weather[0].main.toLowerCase().includes('snow')
    );

    const avgTemp = resorts.reduce((sum, r) => 
      sum + weatherData[r.id].current.temp, 0
    ) / resorts.length;

    return (
      <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-xl font-semibold mb-4">Current Weather Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <CloudSnow className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium">Snowing at</p>
              <p className="text-gray-600">
                {snowyResorts.length} of {resorts.length} resorts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Thermometer className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium">Average Temperature</p>
              <p className="text-gray-600">{avgTemp.toFixed(1)}°C</p>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recommended Ski Resorts
          </h1>
          <p className="text-gray-600">
            Found {recommendations.length} resorts matching your preferences
          </p>
        </div>

        {getWeatherSummary()}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(resort => (
            <ResortCard 
              key={resort.id} 
              resort={resort} 
              weather={weatherData[resort.id]}
            />
          ))}
        </div>
      </div>
    </main>
  );
}