import mockData from '@/data/mock-resorts.json';
import { SkiResort, UserPreferences } from '@/lib/types';
import { calculateMatchScore } from './recommendations';

export async function getRecommendations(preferences: UserPreferences) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const scoredResorts = mockData.resorts.map(resort => ({
    ...resort,
    matchScore: calculateMatchScore(resort, preferences)
  }));

  return scoredResorts.sort((a, b) => b.matchScore - a.matchScore);
}

export async function getResortById(id: string): Promise<SkiResort | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const resort = mockData.resorts.find(r => r.id === id);
  return resort || null;
}