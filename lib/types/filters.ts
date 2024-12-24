export interface ResortFilters {
  // 基本信息筛选
  name?: string;
  country_code?: string; // 单选国家


  // 坡道相关筛选
  total_slopes_min?: number;
  total_slopes_max?: number;
  snow_parks_min?: number;
  snow_parks_max?: number;
  ski_lifts_min?: number;
  ski_lifts_max?: number;


  // 价格和预算
  adult_day_pass_min?: number;
  adult_day_pass_max?: number;


  // 特殊条件
  night_skiing?: boolean; // 单选夜间滑雪
}