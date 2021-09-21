import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

import { Failure } from '../helpers/failure';

export class SharedRepository<T> {
  readonly entity: Repository<T>;

  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  find = async (options?: FindManyOptions<T>): Promise<Array<Partial<T>>> =>
    this.entity.find(options);

  findById = async (id: number): Promise<T> => this.entity.findOneOrFail(id);

  findOne = async (options?: FindOneOptions<T>): Promise<T | undefined> =>
    this.entity.findOne(options);

  // TODO: Handle this function in a better way
  create = async (body: DeepPartial<T> | null, instance?: T): Promise<T> => {
    if (!body && !instance) {
      throw Failure.badRequest('Both body and instance cannot be empty');
    }

    if (instance) {
      return this.entity.save(instance);
    }

    const entity = await this.createInstance(body);
    return this.entity.save(entity);
  };

  // creates an instance without saving it to database
  createInstance = async (body: DeepPartial<T> | null): Promise<T> => {
    if (body) return this.entity.create(body);

    throw Failure.badRequest('Body cannot be empty');
  };

  update = async (id: number, body: DeepPartial<T>): Promise<T> => {
    await this.entity.update(id, body);
    return this.findById(id);
  };

  delete = async (id: number): Promise<T> => {
    const entity = this.findById(id);
    await this.entity.delete(id);
    return entity;
  };
}

export default SharedRepository;
