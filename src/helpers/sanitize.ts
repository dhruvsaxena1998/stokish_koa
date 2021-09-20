import { omit } from "lodash";
import { ObjectLiteral } from "typeorm";

import { config as UsersConfig } from "../entities/user.entity";

const privateProperties = {
  users: UsersConfig.privateArrtibutes,
};

export const sanitizeEntity = (
  entity: keyof typeof privateProperties,
  data: ObjectLiteral
): Partial<ObjectLiteral> => {
  return omit(data, privateProperties[entity]);
};
