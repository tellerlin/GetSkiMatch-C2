import { SkiResort, UserPreferences } from '../types/index';

export function calculateMatchScore(resort: SkiResort, preferences: UserPreferences): number {
  const skillLevelMatch = calculateSkillLevelMatch(resort, preferences.skillLevel);
  const budgetMatch = calculateBudgetMatch(resort, preferences.budgetRange);
  const terrainMatch = calculateTerrainMatch(resort, preferences.terrainPreferences);
  
  return Math.round(skillLevelMatch * 40 + budgetMatch * 30 + terrainMatch * 30);
}

function calculateSkillLevelMatch(resort: SkiResort, skillLevel: UserPreferences['skillLevel']): number {
  const difficultyDistribution = {
    beginner: resort.beginner_percentage,
    intermediate: resort.intermediate_percentage,
    advanced: resort.advanced_percentage
  };
  
  switch (skillLevel) {
    case 'beginner':
      return (difficultyDistribution.beginner * 2 + difficultyDistribution.intermediate) / 200;
    case 'intermediate':
      return (difficultyDistribution.intermediate * 2 + difficultyDistribution.beginner + difficultyDistribution.advanced) / 300;
    case 'advanced':
      return (difficultyDistribution.advanced * 2 + difficultyDistribution.intermediate) / 200;
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
  
  preferences.forEach((pref: 'groomed' | 'powder' | 'park' | 'backcountry') => {
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
