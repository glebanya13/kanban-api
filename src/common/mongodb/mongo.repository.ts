import { PaginationInput } from '@common/repository/input/pagination.input';
import { DatabaseModel } from '@common/type/model';
import { Repository } from '@common/type/repository';
import {
  AggregateOptions,
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  PopulateOptions,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class MongoRepository<M extends DatabaseModel>
  implements Repository<string, M>
{
  constructor(
    protected readonly entityModel: Model<M>,
    protected readonly populatedFields: string[] = [],
    protected readonly virtualFields: string[] = [],
  ) {}

  async findAll<T = M>(limit?: number): Promise<T[] | null> {
    const query = this.entityModel.find<T>();
    if (limit) return query.sort().limit(limit).exec();
    return query.exec();
  }

  async populateDoc<T>(
    doc: Document,
    populateOptions: string | PopulateOptions | (string | PopulateOptions)[],
  ) {
    return doc.populate<T>(populateOptions);
  }

  async populateDocs<T = M>(
    docs: any[] | Document[],
    populateOptions: string | PopulateOptions | (string | PopulateOptions)[],
  ): Promise<T[]> {
    return await Promise.all(
      docs.map((doc) => this.populateDoc<T>(doc, populateOptions)),
    );
  }

  documentToModel<T = M>(doc: Document) {
    return doc?.toJSON() as T;
  }

  documentsToModels<T = M>(docs: Document[] | any[]) {
    return docs.map((doc) => this.documentToModel<T>(doc));
  }

  async findOne<T = M>(
    entityFilterQuery: FilterQuery<T>,
    populate: boolean = true,
    projection?: Record<string, unknown>,
    options: QueryOptions = {},
  ): Promise<T> {
    const query = this.entityModel.findOne(
      entityFilterQuery,
      {
        ...projection,
      },
      options,
    );

    if (populate) {
      query.populate(this.populatedFields);
    }

    return query.exec().then((doc) => this.documentToModel<T>(doc));
  }

  async findById<T = M>(
    id: string,
    populate: boolean = true,
  ): Promise<T | null> {
    const query = this.entityModel.findById(id);
    if (populate) {
      return query
        .populate(this.populatedFields)
        .exec()
        .then((doc) => this.documentToModel<T>(doc));
    }
    return query.exec().then((doc) => this.documentToModel<T>(doc));
  }

  async find<T = M>(
    entityFilterQuery: FilterQuery<T> = {},
    projection?: Record<string, unknown>,
    options?: QueryOptions,
  ): Promise<T[] | null> {
    const result = await this.lazyFind<T>(
      entityFilterQuery,
      projection,
      options,
    ).exec();
    return this.documentsToModels(result);
  }

  async findAndLimit(
    entityFilterQuery: FilterQuery<M> = {},
    limit?: number,
    projection?: Record<string, unknown>,
  ): Promise<M[]> {
    let query = this.lazyFind(entityFilterQuery, projection);
    query = limit ? query.limit(limit) : query;
    return query.exec();
  }

  lazyFind<T = M>(
    entityFilterQuery: FilterQuery<M> = {},
    projection?: Record<string, unknown>,
    options?: QueryOptions,
  ) {
    return this.entityModel.find<T>(entityFilterQuery, projection, options);
  }

  async create(
    model: Omit<M, 'id' | (typeof this.virtualFields)[number]>,
  ): Promise<M | null> {
    const entity = new this.entityModel(model);
    return entity.save().then((val) => val.toObject());
  }

  async findByIdAndReplace(id: string, data: Omit<M, 'id'>): Promise<void> {
    return this.entityModel.findOneAndReplace({ id }, data);
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<M>,
    updateEntityData: UpdateQuery<M> | Record<keyof M, any>,
  ): Promise<M | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async findByIdAndUpdate(
    id: string,
    updateEntityData: UpdateQuery<M> | Record<keyof M, any>,
  ): Promise<M | null> {
    return this.entityModel.findByIdAndUpdate(id, updateEntityData, {
      new: true,
    });
  }

  async search<T = M>(
    filters?: FilterQuery<M>,
    pagination?: PaginationInput,
    populations: string[] = [],
  ): Promise<T[]> {
    return this.lazyFind(filters, {}, { ...pagination })
      .populate(populations)
      .exec()
      .then((docs) => this.documentsToModels<T>(docs));
  }

  async findByIdAndRemove(id: string) {
    return this.entityModel.findByIdAndDelete(id).exec();
  }

  async getAllPopulated<T = M>(): Promise<T[]> {
    return await this.lazyFind<T>()
      .populate(this.populatedFields)
      .exec()
      .then((docs) => this.documentsToModels(docs));
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<M>) {
    const deleteResult =
      await this.entityModel.findByIdAndDelete(entityFilterQuery);
    return deleteResult.$isDeleted;
  }

  async deleteMany(ids: string[]): Promise<boolean> {
    if (!ids?.length) return false;
    const deleteResult = await this.entityModel.deleteMany({
      _id: { $in: ids },
    });
    return deleteResult.deletedCount >= 1;
  }

  async findAndDelete(entityFilterQuery: FilterQuery<M> = {}) {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async findByIds<T = M>(ids: string[]): Promise<T[]> {
    return this.find<T>({ _id: { $in: ids } });
  }

  async aggregate<T>(pipelines: PipelineStage[], options?: AggregateOptions) {
    return this.entityModel.aggregate<T>(pipelines, options);
  }

  async updateMany<T>(query: FilterQuery<M>, update: UpdateQuery<M>) {
    return this.entityModel.updateMany(query, update);
  }

  async count(query?: FilterQuery<M>): Promise<number> {
    return this.entityModel.countDocuments(query);
  }
}
