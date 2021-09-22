import { omit } from 'lodash';
import { ObjectLiteral } from 'typeorm';

import { config as UsersConfig } from '../entities/user.entity';

const privateProperties = {
  users: UsersConfig.privateAttributes,
};

export const sanitizeEntity = (
  entity: keyof typeof privateProperties,
  data: ObjectLiteral,
): Partial<ObjectLiteral> => omit(data, privateProperties[entity]);
