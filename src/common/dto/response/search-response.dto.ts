import { SearchAggregations } from '@common/dto/response/search-aggregations';

export interface SearchResponseDto<T> {
  aggregations: SearchAggregations;

  items: T[];
}
