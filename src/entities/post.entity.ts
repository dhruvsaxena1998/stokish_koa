import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '.';
import { SharedEntityProperties } from './shared.entity';
import { EntityConfig } from '../@types/entity';

export const config: EntityConfig = {
  collectionName: 'posts',
  info: {
    name: 'post',
    description: '',
  },
  privateAttributes: [],
};

@Entity({ name: 'posts' })
export class PostEntity extends SharedEntityProperties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'text' })
  title: string;

  @Column({ name: 'body', type: 'text', array: true })
  body: string[];

  @Column({
    name: 'thumbnail',
    type: 'text',
    nullable: true,
    default: null,
  })
  thumbnail: string;

  @Column({
    name: 'keywords',
    type: 'text',
    array: true,
  })
  keywords: string[];

  @Column({
    type: 'date',
    name: 'published_at',
    nullable: true,
    default: null,
  })
  publishedAt: Date;

  // * Relation with User
  @OneToOne(() => UserEntity, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn()
  author: UserEntity;

  authorId: number;
}
