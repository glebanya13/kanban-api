import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignInRequestDto } from './dto/sign-in.dto';
import { SignUpRequestDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.model';
import { Auth } from './auth.model';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async findByUsername(username: string): Promise<Auth> {
    const auth = (await this.repository.findOne({ username }, false)) as Auth;

    if (!auth) {
      throw new UnauthorizedException('User not found');
    }

    return auth;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async signUp(signUp: SignUpRequestDto): Promise<any> {
    const newUser = await this.userService.create(signUp);
    if (!newUser) {
      throw new InternalServerErrorException('User creation failed');
    }

    const hash = await this.hashData(signUp.password);

    const newAuth = await this.repository.create({
      username: signUp.username,
      password: hash,
      userId: newUser.id,
    });

    if (!newAuth) {
      throw new InternalServerErrorException('Auth creation failed');
    }

    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(dto: SignInRequestDto) {
    const user = await this.findByUsername(dto.username);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, dto.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.userId, user.username);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async getProfile(username: string): Promise<User> {
    const auth = await this.findByUsername(username);

    if (!auth) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userService.findById(auth.userId);

    if (!user) {
      throw new UnauthorizedException('User profile not found');
    }

    return user;
  }
}
