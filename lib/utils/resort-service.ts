import { SkiResort, ResortFilters } from '../types';
import { UserPreferences } from '../types/index';

const API_BASE_URL = 'https://ski-query-worker.3we.org';

export async function getFilteredResorts(filters: ResortFilters = {}) {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v));
      } else {
        queryParams.append(key, value.toString());
      }
    }
  });

  try {
    // Get countries data for weather agency information
    const countriesResponse = await fetch(`${API_BASE_URL}/countries`);
    const countriesData = await countriesResponse.json();
    const countriesMap = new Map(countriesData.map((c: any) => [c.country_code, c]));

    // Get resorts data
    const resortsResponse = await fetch(`${API_BASE_URL}/resorts?${queryParams.toString()}`);
    const resortsData = await resortsResponse.json();

    if (!resortsResponse.ok) {
      throw new Error(`HTTP error! status: ${resortsResponse.status}`);
    }

    // Enhance resorts with additional data
    const enhancedResorts = await Promise.all(
      resortsData.resorts.map(async (resort: any) => {
        // Get weather data
        const weatherResponse = await fetch(`${API_BASE_URL}/resort?id=${resort.resort_id}`);
        const weatherData = await weatherResponse.json();
        
        // Get country info
        const countryInfo = countriesMap.get(resort.country_code);

        console.log('Original resort data:', resort);
        console.log('Weather data:', weatherData);
        
        const enhancedResort = {
          ...resort,
          weather_agency: countryInfo?.weather_agency,
          currentWeather: weatherData.currentWeather ? {
            temperature: weatherData.currentWeather.temperature,
            weather_description: weatherData.currentWeather.weather_description
          } : undefined
        };
        
        console.log('Enhanced resort data:', enhancedResort);
        return enhancedResort;
      })
    );

    return {
      resorts: enhancedResorts || [],
      pagination: resortsData.pagination || {
        total: 0,
        page: 1,
        limit: 20,
        total_pages: 0
      }
    };
  } catch (error) {
    return {
      resorts: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 20,
        total_pages: 0
      }
    };
  }
}

export async function getResortById(id: string): Promise<SkiResort | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/resort?id=${id}`);
    const data = await response.json();

    if (!response.ok || !data.resort || !data.resort.resort_id || !data.resort.name) {
      return null;
    }

    return data.resort;
  } catch (error) {
    return null;
  }
}

export async function getCountries() {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data || [];
  } catch (error) {
    return [];
  }
}

export async function getRecommendations(preferences: UserPreferences): Promise<SkiResort[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data.resorts || [];
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}

export default {
  getFilteredResorts,
  getResortById,
  getCountries,
  getRecommendations
};
