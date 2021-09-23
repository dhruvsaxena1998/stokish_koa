import { PostEntity } from '../entities';

export interface IPagination {
  start: number;
  limit: number;
}

export interface PostsPaginated {
  entities: PostEntity[];
  count: number;
}
