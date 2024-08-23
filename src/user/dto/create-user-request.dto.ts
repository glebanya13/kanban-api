import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user.model';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @IsString()
  role: UserRole[];

  @IsOptional()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
