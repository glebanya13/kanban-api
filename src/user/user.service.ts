import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { CrudService } from '@common/type/crud.service';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import { Mapper } from '@automapper/core';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { SearchUsersRequestDto } from './dto/search-users-request.dto';
import { SearchUsersFilters } from './dto/search-users-filters.dto';
import { SearchUsersFiltersInput } from './dto/search-users.input';
import { DefaultMapper } from '@common/mapper/default.mapper';

@Injectable()
export class UserService extends CrudService<string, User> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    protected repository: UserRepository,
  ) {
    super('User', repository);
  }

  async create(createUserRequestDto: CreateUserRequestDto): Promise<User> {
    return await this.repository.create(createUserRequestDto);
  }

  async search(searchUsersRequestDto: SearchUsersRequestDto) {
    if (!Object.keys(searchUsersRequestDto).length) {
      return this.getAll();
    }

    const paginationInput = DefaultMapper.getPaginationInput(
      searchUsersRequestDto.pagination,
    );
    const filtersInput = this.mapper.map(
      searchUsersRequestDto.filters,
      SearchUsersFilters,
      SearchUsersFiltersInput,
    );

    return this.repository.search(filtersInput, paginationInput);
  }
}
