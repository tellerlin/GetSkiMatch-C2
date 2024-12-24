import { SkiResort, UserPreferences } from '../types';
import { ResortFilters } from '../types/filters';
import { buildQueryString } from './filter-service';

const API_BASE_URL = 'https://ski-query-worker.3we.org';

export async function getFilteredResorts(filters: ResortFilters) {
  try {
    const queryString = buildQueryString(filters);
    const response = await fetch(`${API_BASE_URL}/resorts${queryString}`);
    const data = await response.json();
    return {
      resorts: data.resorts || [],
      pagination: data.pagination
    };
  } catch (error) {
    console.error('Error fetching filtered resorts:', error);
    return { resorts: [], pagination: null };
  }
}

export async function getRecommendations(preferences: UserPreferences) {
  try {
    // Convert user preferences to API filters
    const filters: ResortFilters = {
      country_code: preferences.country || undefined,
      total_slopes_min: 0,
      adult_day_pass_min: preferences.budgetRange.min,
      adult_day_pass_max: preferences.budgetRange.max
    };

    const { resorts } = await getFilteredResorts(filters);
    return resorts.map(resort => ({
      ...resort,
      matchScore: calculateMatchScore(resort, preferences)
    }));
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}

export async function getResortById(id: string): Promise<SkiResort | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/resort?id=${id}`);
    const data = await response.json();
    return data.resort || null;
  } catch (error) {
    console.error('Error fetching resort:', error);
    return null;
  }
}

export async function getCountries() {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

// Helper function to calculate match score
function calculateMatchScore(resort: SkiResort, preferences: UserPreferences): number {
  let score = 0;
  
  // Skill level match (0-40 points)
  const skillLevelMatch = calculateSkillLevelMatch(resort, preferences.skillLevel);
  score += skillLevelMatch * 40;
  
  // Budget match (0-30 points)
  const budgetMatch = calculateBudgetMatch(resort, preferences.budgetRange);
  score += budgetMatch * 30;
  
  // Terrain preferences match (0-30 points)
  const terrainMatch = calculateTerrainMatch(resort, preferences.terrainPreferences);
  score += terrainMatch * 30;
  
  return Math.round(score);
}

function calculateSkillLevelMatch(resort: SkiResort, skillLevel: UserPreferences['skillLevel']): number {
  switch (skillLevel) {
    case 'beginner':
      return (resort.beginner_percentage * 2 + resort.intermediate_percentage) / 200;
    case 'intermediate':
      return (resort.intermediate_percentage * 2 + resort.beginner_percentage + resort.advanced_percentage) / 300;
    case 'advanced':
      return (resort.advanced_percentage * 2 + resort.intermediate_percentage) / 200;
    default:
      return 0;
  }
}

function calculateBudgetMatch(resort: SkiResort, budgetRange: UserPreferences['budgetRange']): number {
  const price = resort.adult_day_pass;
  
  if (price <= budgetRange.min) return 0.8;
  if (price > budgetRange.max) return 0;
  if (price <= (budgetRange.min + budgetRange.max) / 2) return 1;
  
  return 1 - ((price - (budgetRange.min + budgetRange.max) / 2) / (budgetRange.max - (budgetRange.min + budgetRange.max) / 2));
}

function calculateTerrainMatch(resort: SkiResort, preferences: UserPreferences['terrainPreferences']): number {
  let match = 0;
  
  preferences.forEach(pref => {
    switch (pref) {
      case 'groomed':
        match += resort.beginner_percentage + resort.intermediate_percentage > 60 ? 1 : 0.5;
        break;
      case 'powder':
        match += resort.advanced_percentage > 20 ? 1 : 0.5;
        break;
      case 'park':
        match += resort.snow_parks >= 3 ? 1 : 0.5;
        break;
      case 'backcountry':
        match += resort.advanced_percentage > 25 ? 1 : 0.5;
        break;
    }
  });
  
  return match / preferences.length;
}