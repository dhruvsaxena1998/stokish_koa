import { JSONSchemaType } from "ajv";
import { ajv } from "../../../utils";

import {
  ILoginViaIdentifierDto,
  IRegisterViaEmailDto,
  IRegisterViaPhoneDto,
} from "../../interface";

const registerViaEmailSchema: JSONSchemaType<IRegisterViaEmailDto> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    username: { type: "string", minLength: 3 },
    password: { type: "string", minLength: 6 },
  },
  required: ["email", "username", "password"],
  additionalProperties: false,
};

const registerViaPhoneSchema: JSONSchemaType<IRegisterViaPhoneDto> = {
  type: "object",
  properties: {
    contact: { type: "string" },
    countryCode: { type: "number" },
  },
  required: ["contact", "countryCode"],
  additionalProperties: false,
};

const loginViaIdentifierSchema: JSONSchemaType<ILoginViaIdentifierDto> = {
  type: "object",
  properties: {
    identifier: { type: "string" },
    password: { type: "string" },
  },
  required: ["identifier", "password"],
  additionalProperties: false,
};

export const registerViaEmailValidator =
  ajv.compile<IRegisterViaEmailDto>(registerViaEmailSchema);
export const registerPhoneValidator =
  ajv.compile<IRegisterViaPhoneDto>(registerViaPhoneSchema);
export const loginViaIdentifierValidator = ajv.compile<ILoginViaIdentifierDto>(loginViaIdentifierSchema);
