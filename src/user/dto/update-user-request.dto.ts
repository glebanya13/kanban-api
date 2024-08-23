import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user.model';

export class UpdateUserRequestDto {
  @IsNotEmpty()
  @IsString()
  role: UserRole[];

  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;
}
