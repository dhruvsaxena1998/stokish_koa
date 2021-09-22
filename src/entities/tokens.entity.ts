import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '.';
import { EntityConfig } from '../@types/entity';
import { SharedEntityProperties } from './shared.entity';

export const config: EntityConfig = {
  collectionName: 'tokens',
  info: {
    name: 'token',
    description: 'Handles tokens related queries',
  },
  privateAttributes: [],
};

@Entity({ name: 'tokens' })
export class TokenEntity extends SharedEntityProperties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'reset_password_token',
    nullable: true,
    default: null,
    type: 'text',
  })
  resetPasswordToken: string;

  @Column({
    name: 'magic_token',
    nullable: true,
    default: null,
    type: 'text',
  })
  magicToken: string | null;

  @Column({
    name: 'totp',
    nullable: true,
    default: null,
    type: 'text',
  })
  totp: string;

  // * Relation with User
  @OneToOne(() => UserEntity, (user) => user.token, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  userId: number;
}
