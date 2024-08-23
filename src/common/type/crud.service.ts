import { DatabaseModel } from './model';
import { PartialRecord } from './partialRecord';
import { Repository } from './repository';
import { ConflictException, NotFoundException } from '@nestjs/common';

export abstract class CrudService<
  K extends string | number,
  V extends DatabaseModel,
> {
  constructor(
    private entityName: string,
    protected repository: Repository<K, V>,
  ) {}

  abstract create(dto: any, ...params: any[]): Promise<V>;

  async findById(id: K) {
    return this.repository.findById(id);
  }

  async findOne(id: K) {
    return this.repository.findById(id);
  }

  async getAll() {
    return this.repository.findAll();
  }

  async findOneOrThrow(
    id: K,
    errorText = `${this.entityName} not found`,
  ): Promise<V> {
    const result = await this.repository.findById(id);
    if (result) return result;
    throw new NotFoundException(errorText);
  }

  async throwIfExists(id: K, errorText = `${this.entityName} not found`) {
    const result = await this.repository.findById(id);
    if (!result) throw new ConflictException(errorText);
  }

  async remove(id: K) {
    return this.repository.findByIdAndRemove(id);
  }

  async update(id: K, data: PartialRecord<keyof V, any>) {
    return this.repository.findByIdAndUpdate(id, data);
  }

  async findByIds(ids: K[]) {
    return this.repository.findByIds(ids);
  }

  async throwOnNonExistent(ids: K[]) {
    return this.getNonExistentIds(ids).then((notFoundIds) => {
      if (notFoundIds.length)
        throw new NotFoundException(
          {
            notFoundIds,
          },
          `These ${this.entityName.toLocaleLowerCase()}\`s not found`,
        );
    });
  }

  async getNonExistentIds(ids: K[]): Promise<K[]> {
    return this.findByIds(ids)
      .then((models) => {
        console.log(ids, models);
        return models;
      })
      .then((models) => models.map((model) => model.id as K))
      .then((models) => {
        console.log(ids, models);
        return models;
      })
      .then((found) => ids.filter((id) => !found.includes(id)));
  }
}
