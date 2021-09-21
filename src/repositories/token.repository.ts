import { TokenEntity } from '../entities';
import { Dependencies } from '../@types/dependencies';
import { SharedRepository } from './shared.repository';

export class TokenRepository extends SharedRepository<TokenEntity> {
  constructor({ database }: Dependencies) {
    super(database.getRepository(TokenEntity));
  }
}

export default TokenRepository;
