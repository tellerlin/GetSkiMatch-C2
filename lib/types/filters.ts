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
  night_skiing?: 0 | 1; // 使用 0/1 替代 boolean


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