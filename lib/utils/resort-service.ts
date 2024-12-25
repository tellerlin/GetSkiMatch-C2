import { SkiResort, ResortFilters } from '../types';

const API_BASE_URL = 'https://ski-query-worker.3we.org';

// 添加日志工具函数
const logApiCall = (url: string, response: Response, data: any) => {
  console.log(`API Call to: ${url}`);
  console.log('Response status:', response.status);
  console.log('Response data:', JSON.stringify(data, null, 2));
};

// 获取过滤后的滑雪场列表
export async function getFilteredResorts(filters: ResortFilters = {}) {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  const url = `${API_BASE_URL}/resorts?${queryParams.toString()}`;
  console.log('Fetching filtered resorts from:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    logApiCall(url, response, data);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      resorts: data.resorts || [],
      pagination: data.pagination || {
        total: 0,
        page: 1,
        limit: 20,
        total_pages: 0
      }
    };
  } catch (error) {
    console.error('Error fetching filtered resorts:', error);
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

// 获取单个滑雪场详情
export async function getResortById(id: string): Promise<SkiResort | null> {
  const url = `${API_BASE_URL}/resort?id=${id}`;
  console.log('Fetching resort details from:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    logApiCall(url, response, data);

    if (!response.ok) {
      console.error('Resort API response not ok:', response.status, response.statusText);
      return null;
    }

    if (!data.resort) {
      console.error('Invalid resort data format:', data);
      return null;
    }

    // 验证关键数据字段
    const resort = data.resort;
    if (!resort.resort_id || !resort.name) {
      console.error('Missing required resort fields:', resort);
      return null;
    }

    return resort;
  } catch (error) {
    console.error('Error fetching resort:', error);
    return null;
  }
}

// 获取国家列表
export async function getCountries() {
  const url = `${API_BASE_URL}/countries`;
  console.log('Fetching countries from:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    logApiCall(url, response, data);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export default {
  getFilteredResorts,
  getResortById,
  getCountries
};
