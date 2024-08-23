import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignUpRequestDto } from './dto/sign-up.dto';
import { SignInRequestDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '@common/guard/access-token.guard';
import { RefreshTokenGuard } from '@common/guard/refresh-token.guard';
import { Public } from '@common/decorator/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async signUp(
    @Body()
    signUpRequestDto: SignUpRequestDto,
  ) {
    return this.authService.signUp(signUpRequestDto);
  }

  @Public()
  @Post('login')
  async signIn(@Body() signInRequestDto: SignInRequestDto) {
    return await this.authService.signIn(signInRequestDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Request() req: any) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req: any) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.username);
  }
}
