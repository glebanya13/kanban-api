import { IsString } from 'class-validator';
import { CreateUserRequestDto } from '../../user/dto/create-user-request.dto';

export class SignUpRequestDto extends CreateUserRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
