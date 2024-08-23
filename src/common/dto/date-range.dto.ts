import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class DateRangeDTO {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @AutoMap(() => Date)
  from?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @AutoMap(() => Date)
  to?: Date;
}
