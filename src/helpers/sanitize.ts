import { omit } from 'lodash';
import { ObjectLiteral } from 'typeorm';

import { config as UsersConfig } from '../entities/user.entity';
import { config as PostsConfig } from '../entities/post.entity';

const privateProperties = {
  users: UsersConfig.privateAttributes,
  posts: PostsConfig.privateAttributes,
};

export const sanitizeEntity = (
  entity: keyof typeof privateProperties,
  data: ObjectLiteral,
): Partial<ObjectLiteral> => omit(data, privateProperties[entity]);
