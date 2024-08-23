import { ApiProperty } from '@nestjs/swagger';

export class SearchAggregations {
  @ApiProperty()
  total: number;
}
