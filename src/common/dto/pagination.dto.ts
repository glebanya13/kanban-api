import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Transform((param) => parseInt(param.value))
  @Min(1)
  @AutoMap(() => Number)
  @ApiPropertyOptional()
  limit: number = 10;

  @IsOptional()
  @IsInt()
  @Transform((param) => parseInt(param.value))
  @Min(0)
  @AutoMap(() => Number)
  @ApiPropertyOptional()
  offset: number = 0;
}
