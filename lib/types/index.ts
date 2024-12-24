export interface SkiResort {
  resort_id: string;
  name: string;
  country_code: string;
  region?: string;
  total_slopes: number;
  snow_parks?: number;
  ski_lifts?: number;
  adult_day_pass: number;
  currency?: string;
  night_skiing: 0 | 1;
  image_url?: string;
}


export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}


export interface ResortFilters {
  // 基本查询
  name?: string;
  country_code?: string;
  region?: string;


  // 数值范围查询
  total_slopes_min?: number;
  total_slopes_max?: number;
  snow_parks_min?: number;
  snow_parks_max?: number;
  ski_lifts_min?: number;
  ski_lifts_max?: number;
  adult_day_pass_min?: number;
  adult_day_pass_max?: number;


  // 特定条件
  night_skiing?: 0 | 1;


  // 分页
  page?: number;
  limit?: number;
}


export interface Country {
  country_code: string;
  name: string;
  weather_agency: string;
  total_resorts: number;
}