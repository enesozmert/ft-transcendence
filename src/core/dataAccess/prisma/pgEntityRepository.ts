import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class EntityService<T> {
  constructor(private readonly entityRepository: Repository<T>) {}

  public async getAll(): Promise<T[]> {
    return this.entityRepository.find();
  }

  public async getById(id: number): Promise<T> {
    return this.entityRepository.findOne(id as any);
  }

  // public async update(id: number, updatedEntity: Partial<T>): Promise<T> {
  //   const entity = await this.entityRepository.findOne(id as any);

  //   if (!entity) {
  //     throw new Error('Entity not found');
  //   }

  //   const mergedEntity = this.entityRepository.merge(entity, updatedEntity);

  //   return await this.entityRepository.save(mergedEntity);
  // }

  public async delete(id: number): Promise<void> {
    await this.entityRepository.delete(id);
  }
}
