import { DeepPartial, Repository } from "typeorm";

export class SharedRepository<T> {
  readonly _entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this._entity = entity;
  }

  find = async (): Promise<Array<Partial<T>>> => {
    return this._entity.find();
  };

  findOne = async (id: number): Promise<T> => {
    return this._entity.findOneOrFail(id);
  };

  create = async (body: DeepPartial<T>): Promise<T> => {
    const entity = await this.createInstance(body);
    return this._entity.save(entity);
  };

  private createInstance = async (body: DeepPartial<T>): Promise<T> => {
    return this._entity.create(body);
  };

  async update(id: number, body: DeepPartial<T>): Promise<T> {
    await this._entity.update(id, body);
    return this.findOne(id);
  }

  async delete(id: number): Promise<T> {
    const entity = this.findOne(id);
    await this._entity.delete(id);
    return entity;
  }
}
