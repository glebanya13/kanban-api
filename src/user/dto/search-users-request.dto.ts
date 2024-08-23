import { SearchUsersFilters } from './search-users-filters.dto';
import { AutoMap } from '@automapper/classes';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';

export class SearchUsersRequestDto {
  @IsOptional()
  @IsObject()
  @Type(() => SearchUsersFilters)
  @ValidateNested()
  @AutoMap(() => SearchUsersFilters)
  filters?: SearchUsersFilters;

  @IsOptional()
  @IsObject()
  @Type(() => PaginationDto)
  @ValidateNested()
  @AutoMap(() => PaginationDto)
  pagination?: PaginationDto;
}
