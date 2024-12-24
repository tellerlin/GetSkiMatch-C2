import { ResortFilters } from '../types/filters';

export function buildQueryString(filters: ResortFilters): string {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, value.toString());
    }
  });

  return params.toString() ? `?${params.toString()}` : '';
}