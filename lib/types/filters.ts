export interface ResortFilters {
  name?: string;
  country_code?: string;
  region?: string;
  total_slopes_min?: number;
  total_slopes_max?: number;
  snow_parks_min?: number;
  night_skiing?: number;
  ski_lifts_min?: number;
  ski_lifts_max?: number;
  adult_day_pass_min?: number;
  adult_day_pass_max?: number;
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}