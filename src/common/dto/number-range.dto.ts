import { AutoMap } from '@automapper/classes';
import { IsNumber, IsOptional } from 'class-validator';

export class NumberRangeDTO {
  @IsOptional()
  @IsNumber()
  @AutoMap(() => Number)
  from?: number;

  @IsOptional()
  @IsNumber()
  @AutoMap(() => Number)
  to?: number;
}
