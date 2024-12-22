export interface SkiResort {
  id: string;
  name: string;
  location: {
    lat: number;
    lon: number;
    country: string;
    region: string;
  };
  difficulty: {
    beginner: number;    // Percentage of beginner slopes
    intermediate: number; // Percentage of intermediate slopes
    advanced: number;    // Percentage of advanced slopes
  };
  features: {
    totalSlopes: number;
    snowParks: number;
    nightSkiing: boolean;
    skiLifts: number;
  };
  pricing: {
    adultDayPass: number;
    currency: string;
  };
  season: {
    start: string;  // MM-DD format
    end: string;    // MM-DD format
  };
  imageUrl: string;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type TerrainPreference = 'groomed' | 'powder' | 'park' | 'backcountry';

export interface UserPreferences {
  skillLevel: SkillLevel;
  terrainPreferences: TerrainPreference[];
  budgetRange: {
    min: number;
    max: number;
  };
  travelDistance: number; // in kilometers
}

export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    temp: {
      min: number;
      max: number;
    };
    pop: number;
    snow?: number;
  }>;
}