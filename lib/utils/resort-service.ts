import { SkiResort, ResortFilters, UserPreferences, CountryInfo } from '../types/index';

const API_BASE_URL = 'https://ski-query-worker.3we.org';

// 添加缓存
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存
const cache = new Map<string, { data: any; timestamp: number }>();

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

// 批量获取数据的函数
async function batchFetchResortDetails(resortIds: string[]) {
  const promises = resortIds.map(id => 
    fetch(`${API_BASE_URL}/resort?id=${id}`).then(res => res.json())
  );
  return Promise.all(promises);
}

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

  const cacheKey = `resorts:${queryParams.toString()}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const [countriesResponse, resortsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/countries`),
      fetch(`${API_BASE_URL}/resorts?${queryParams.toString()}`)
    ]);

    const [countriesData, resortsData] = await Promise.all([
      countriesResponse.json(),
      resortsResponse.json()
    ]);

    const countriesMap = new Map(countriesData.map((c: CountryInfo) => [c.country_code, c]));

    if (!resortsResponse.ok) {
      throw new Error(`HTTP error! status: ${resortsResponse.status}`);
    }

    if (resortsData.resorts && Array.isArray(resortsData.resorts)) {
      // 批量获取详细信息
      const resortIds = resortsData.resorts.map((r: SkiResort) => r.resort_id);
      const detailsData = await batchFetchResortDetails(resortIds);

      const enhancedResorts = resortsData.resorts.map((resort: SkiResort, index: number) => {
        const detailData = detailsData[index];
        const countryInfo = countriesMap.get(resort.country_code);

        return {
          ...resort,
          night_skiing: resort.night_skiing ? 1 : 0,
          weather_agency: (countryInfo as CountryInfo)?.weather_agency,
          slopes_description: (detailData.resort as { slopes_description?: string })?.slopes_description,
          currentWeather: detailData.currentWeather
        };
      });

      const result = {
        resorts: enhancedResorts,
        pagination: resortsData.pagination || {
          total: 0,
          page: 1,
          limit: 20,
          total_pages: 0
        }
      };

      setCachedData(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.error('Error fetching resorts:', error);
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
  const cacheKey = `resort:${id}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/resort?id=${id}`);
    const data = await response.json();

    if (!response.ok || !data.resort || !data.resort.resort_id || !data.resort.name) {
      return null;
    }

    const validatedResort = {
      ...data.resort,
      night_skiing: data.resort.night_skiing ? 1 : 0
    };
    setCachedData(cacheKey, validatedResort);
    return validatedResort;
  } catch (error) {
    return null;
  }
}

export async function getCountries() {
  const cacheKey = 'countries';
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/countries`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    return [];
  }
}

export async function getRecommendations(preferences: UserPreferences) {
  const queryParams = new URLSearchParams();
  
  // Convert preferences to query parameters
  if (preferences.skillLevel) {
    queryParams.append('skill_level', preferences.skillLevel);
  }
  if (preferences.preferredTerrain?.length) {
    preferences.preferredTerrain.forEach((terrain: string) => 
      queryParams.append('terrain', terrain)
    );
  }
  if (preferences.maxPrice) {
    queryParams.append('max_price', preferences.maxPrice.toString());
  }
  if (preferences.nightSkiing) {
    queryParams.append('night_skiing', '1');
  }
  if (preferences.snowParks) {
    queryParams.append('snow_parks', '1');
  }
  if (preferences.minSlopes) {
    queryParams.append('min_slopes', preferences.minSlopes.toString());
  }
  if (preferences.minLifts) {
    queryParams.append('min_lifts', preferences.minLifts.toString());
  }
  if (preferences.budgetRange) {
    queryParams.append('min_price', preferences.budgetRange.min.toString());
    queryParams.append('max_price', preferences.budgetRange.max.toString());
  }
  if (preferences.terrainPreferences?.length) {
    preferences.terrainPreferences.forEach((terrain: 'groomed' | 'powder' | 'park' | 'backcountry') => 
      queryParams.append('terrain_preference', terrain)
    );
  }

  const cacheKey = `recommendations:${queryParams.toString()}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/recommendations?${queryParams.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (data.resorts && Array.isArray(data.resorts)) {
      // Batch fetch detailed information for each resort
      const resortIds = data.resorts.map((r: SkiResort) => r.resort_id);
      const detailsData = await batchFetchResortDetails(resortIds);

      const enhancedResorts = data.resorts.map((resort: SkiResort, index: number) => ({
        ...resort,
        night_skiing: resort.night_skiing ? 1 : 0,
        ...detailsData[index].resort,
        currentWeather: detailsData[index].currentWeather
      }));

      setCachedData(cacheKey, enhancedResorts);
      return enhancedResorts;
    }

    return [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
}

export default {
  getFilteredResorts,
  getResortById,
  getCountries,
  getRecommendations
};
