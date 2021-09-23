import { TokenEntity } from '../entities/tokens.entity';
import { Dependencies } from '../@types/dependencies';
import { SharedRepository } from './shared.repository';

export class TokenRepository extends SharedRepository<TokenEntity> {
  constructor({ database }: Dependencies) {
    super(database.getRepository(TokenEntity));
  }
}
