import { PostEntity } from '../entities';
import { SanitizedUser } from './auth.types';

export interface IPagination {
  start: number;
  limit: number;
}

export interface PostsPaginated {
  entities: PostEntity[];
  count: number;
}

export interface IPostCreateDto {
  title: string;
  body: string[];
  thumbnail?: string;
  keywords: string[];
}

export interface IPostCreateServiceDto extends IPostCreateDto {
  author: SanitizedUser;
  publishedAt: Date;
}
