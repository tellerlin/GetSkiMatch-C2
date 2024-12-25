import { SkiResort, UserPreferences } from '../types';

export function calculateMatchScore(resort: SkiResort, preferences: UserPreferences): number {
  const skillLevelMatch = calculateSkillLevelMatch(resort, preferences.skillLevel);
  const budgetMatch = calculateBudgetMatch(resort, preferences.budgetRange);
  const terrainMatch = calculateTerrainMatch(resort, preferences.terrainPreferences);
  
  return Math.round(skillLevelMatch * 40 + budgetMatch * 30 + terrainMatch * 30);
}

function calculateSkillLevelMatch(resort: SkiResort, skillLevel: UserPreferences['skillLevel']): number {
  const difficultyDistribution = resort.difficulty;
  
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
  const price = resort.pricing.adultDayPass;
  
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
        match += resort.difficulty.beginner + resort.difficulty.intermediate > 60 ? 1 : 0.5;
        break;
      case 'powder':
        match += resort.difficulty.advanced > 20 ? 1 : 0.5;
        break;
      case 'park':
        match += resort.features.snowParks >= 3 ? 1 : 0.5;
        break;
      case 'backcountry':
        match += resort.difficulty.advanced > 25 ? 1 : 0.5;
        break;
    }
  });
  
  return match / preferences.length;
}