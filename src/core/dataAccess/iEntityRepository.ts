import {
  DeepPartial,
  FindOneOptions,
  FindManyOptions,
  DeleteResult,
  SaveOptions,
} from 'typeorm';

export interface IEntityRepository<T> {
  create(entity: DeepPartial<T>, options?: SaveOptions): Promise<T>;
  update(id: string | number, entity: any, options?: SaveOptions): Promise<T>;
  findOne(id?: string | number | FindOneOptions<T>): Promise<T>;
  find(options?: FindManyOptions<T>): Promise<T[]>;
  delete(id: string | number): Promise<DeleteResult>;
}
