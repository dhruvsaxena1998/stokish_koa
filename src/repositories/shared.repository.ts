import { Failure } from "../helpers/failure";

import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";

export class SharedRepository<T> {
  readonly _entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this._entity = entity;
  }

  find = async (options?: FindManyOptions<T>): Promise<Array<Partial<T>>> => {
    return this._entity.find(options);
  };

  findById = async (id: number): Promise<T> => {
    return this._entity.findOneOrFail(id);
  };

  findOne = async (options?: FindOneOptions<T>): Promise<T | undefined> => {
    return this._entity.findOne(options);
  };

  create = async (body: DeepPartial<T> | null, instance?: T): Promise<T> => {
    if (!body && !instance)
      throw Failure.badRequest("Both body and instance cannot be empty");

    if (instance) {
      return this._entity.save(instance);
    }

    const entity = await this.createInstance(body);
    return this._entity.save(entity);
  };

  createInstance = async (body: DeepPartial<T> | null): Promise<T> => {
    if (body) return this._entity.create(body);

    throw Failure.badRequest("Body cannot be empty");
  };

  async update(id: number, body: DeepPartial<T>): Promise<T> {
    await this._entity.update(id, body);
    return this.findById(id);
  }

  async delete(id: number): Promise<T> {
    const entity = this.findById(id);
    await this._entity.delete(id);
    return entity;
  }
}
