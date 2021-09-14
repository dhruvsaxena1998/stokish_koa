import { Repository } from "typeorm";

export class SharedRepository<T> {
  private readonly _entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this._entity = entity;
  }

  find = async (): Promise<Array<Partial<T>>> => {
    return this._entity.find();
  };

  findOne = async (id: number): Promise<T> => {
    return this._entity.findOneOrFail(id);
  };
}
