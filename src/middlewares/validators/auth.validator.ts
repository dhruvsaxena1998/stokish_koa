import { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/instance';

import {
  IConnectViaMagicLinkDto,
  ILoginViaIdentifierDto,
  IRegisterViaEmailDto,
  IRegisterViaPhoneDto,
  IVerifyViaMagicLinkDto,
} from '../../@types/auth.types';

const registerViaEmailSchema: JSONSchemaType<IRegisterViaEmailDto> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    username: { type: 'string', minLength: 3 },
    password: { type: 'string', minLength: 6 },
  },
  required: ['email', 'username', 'password'],
  additionalProperties: false,
};

export const registerViaEmailValidator = ajv.compile<IRegisterViaEmailDto>(
  registerViaEmailSchema,
);

const registerViaPhoneSchema: JSONSchemaType<IRegisterViaPhoneDto> = {
  type: 'object',
  properties: {
    contact: { type: 'string' },
    countryCode: { type: 'number' },
  },
  required: ['contact', 'countryCode'],
  additionalProperties: false,
};

export const registerPhoneValidator = ajv.compile<IRegisterViaPhoneDto>(
  registerViaPhoneSchema,
);

const loginViaIdentifierSchema: JSONSchemaType<ILoginViaIdentifierDto> = {
  type: 'object',
  properties: {
    identifier: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['identifier', 'password'],
  additionalProperties: false,
};

export const loginViaIdentifierValidator = ajv.compile<ILoginViaIdentifierDto>(
  loginViaIdentifierSchema,
);

const connectViaMagicLinkSchema: JSONSchemaType<IConnectViaMagicLinkDto> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
  },
  required: ['email'],
  additionalProperties: false,
};

export const connectViaMagicLinkValidator =
  ajv.compile<IConnectViaMagicLinkDto>(connectViaMagicLinkSchema);

const verifyViaMagicLink: JSONSchemaType<IVerifyViaMagicLinkDto> = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
  required: ['token'],
};

export const verifyViaMagicLinkValidator =
  ajv.compile<IConnectViaMagicLinkDto>(verifyViaMagicLink);
