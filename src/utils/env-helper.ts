import { has, get } from "lodash";

export enum ENV {
  development,
  production,
}

export const env = (key: string, defaultValue: unknown): unknown => {
  return has(process.env, key) ? get(process.env, key) : defaultValue;
};

env.has = (key: string): boolean => {
  return has(process.env, key);
};

env.string = (key: string, defaultValue = ""): string => {
  return has(process.env, key) ? String(get(process.env, key)) : defaultValue;
};

env.number = (key: string, defaultValue = NaN): number => {
  return has(process.env, key) ? Number(get(process.env, key)) : defaultValue;
};

env.bool = (key: string, defaultValue = false): boolean => {
  return has(process.env, key) || defaultValue;
};

/**
 * @description returns environment constant as enum
 */
export const kEnv = (): ENV => {
  switch (process.env.NODE_ENV) {
    case "prod":
    case "production":
      return ENV.production;
    case "dev":
    case "develop":
    case "development":
    default:
      return ENV.development;
  }
};
