import { SkiResort, ResortFilters, UserPreferences } from '../types';

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

    const countriesMap = new Map(countriesData.map((c: any) => [c.country_code, c]));

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
          weather_agency: countryInfo?.weather_agency,
          slopes_description: detailData.resort?.slopes_description,
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

    setCachedData(cacheKey, data.resort);
    return data.resort;
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

export default {
  getFilteredResorts,
  getResortById,
  getCountries
};