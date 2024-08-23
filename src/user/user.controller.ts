import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { SearchUsersRequestDto } from './dto/search-users-request.dto';
import { CheckMongoIdPipe } from '@common/pipe/check-mongo-id.pipe';
import { UserService } from './user.service';
import { User } from './user.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(204)
  async create(@Body() dto: CreateUserRequestDto) {
    return this.userService.create(dto);
  }

  @ApiResponse({
    type: User,
    isArray: true,
    description: 'Search users',
  })
  @Put('search')
  async search(@Body() dto: SearchUsersRequestDto) {
    return await this.userService.search(dto);
  }

  @ApiResponse({
    type: User,
  })
  @Get(':id')
  async findOne(@Param('id', new CheckMongoIdPipe()) id: string) {
    return this.userService.findOneOrThrow(id);
  }

  @ApiResponse({
    type: User,
  })
  @Patch(':id')
  @HttpCode(204)
  async update(
    @Param('id', new CheckMongoIdPipe()) id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiResponse({
    type: User,
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new CheckMongoIdPipe()) id: string) {
    return this.userService.remove(id);
  }
}
