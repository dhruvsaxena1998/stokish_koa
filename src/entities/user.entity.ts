import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { SharedEntityProperties } from './shared.entity';

import { UserRole } from '../@types/user.types';
import { EntityConfig } from '../@types/entity';
import { TokenEntity } from '.';

export const config: EntityConfig = {
  collectionName: 'users',
  info: {
    name: 'user',
    description: '',
  },
  privateAttributes: ['password', 'resetPasswordToken', 'totp'],
};

@Entity({ name: 'users' })
export class UserEntity extends SharedEntityProperties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'username', unique: true, nullable: true })
  username: string;

  @Column({ name: 'email', unique: true, nullable: true })
  email: string;

  @Column({ name: 'password', nullable: true, type: 'text' })
  password: string;

  @Column({ name: 'contact', unique: true, nullable: true })
  contact: string;

  @Column({ name: 'country_code', nullable: true, type: 'smallint' })
  countryCode: number;

  @Column({
    name: 'role',
    enum: UserRole,
    default: UserRole.user,
    type: 'enum',
  })
  role: UserRole;

  @Column({ name: 'blocked', default: false, type: 'boolean' })
  blocked: boolean;

  @OneToOne(() => TokenEntity, (token) => token.user)
  token: TokenEntity;
}
