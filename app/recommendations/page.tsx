'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SkiResort, UserPreferences } from '@/lib/types';
import { calculateMatchScore } from '@/lib/utils/recommendations';
import { getRecommendations } from '@/lib/utils/resort-service';
import ResortCard from '@/components/ResortCard';
import { Loader2 } from 'lucide-react';

export default function RecommendationsPage() {
  const searchParams = useSearchParams();
  const [recommendations, setRecommendations] = useState<Array<SkiResort & { matchScore: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const preferencesParam = searchParams.get('preferences');
        if (preferencesParam) {
          const preferences: UserPreferences = JSON.parse(preferencesParam);
          const results = await getRecommendations(preferences);
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(resort => (
            <ResortCard key={resort.id} resort={resort} />
          ))}
        </div>
      </div>
    </main>
  );
}