import { PartialRecord } from './partialRecord';

export class Repository<K, M> {
  findById: (id: K) => Promise<M>;
  create: (model: M | any) => Promise<M>;
  findByIdAndRemove: (id: K) => Promise<M>;
  findByIdAndUpdate: (id: K, data: PartialRecord<keyof M, any>) => Promise<M>;
  findAll: (limit?: number) => Promise<M[]>;
  findByIds: (ids: K[]) => Promise<M[]>;
}
