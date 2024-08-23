import { IsString } from 'class-validator';

export class SignInRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
