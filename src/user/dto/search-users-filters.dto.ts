import { UserRole } from '../user.model';
import { AutoMap } from '@automapper/classes';
import { DateRangeDTO } from '@common/dto/date-range.dto';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class SearchUsersFilters {
  @IsOptional()
  @IsString({ each: true })
  @AutoMap(() => [String])
  role: UserRole[];

  @IsOptional()
  @IsString()
  @AutoMap(() => String)
  username?: string;

  @IsOptional()
  @IsString()
  @AutoMap(() => String)
  firstName?: string;

  @IsOptional()
  @IsString()
  @AutoMap(() => String)
  name?: string;

  @IsOptional()
  @IsString()
  @AutoMap(() => String)
  lastName?: string;

  @IsOptional()
  @IsObject()
  @AutoMap(() => DateRangeDTO)
  birthday?: DateRangeDTO;
}
