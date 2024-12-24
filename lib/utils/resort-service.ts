import { SkiResort } from '../types';
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