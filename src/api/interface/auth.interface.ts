import { UsersEntity } from "../../entities";

export interface IRegisterViaEmailDto {
  email: string;
  username: string;
  password: string;
}

export interface IRegisterViaPhoneDto {
  contact: string;
  countryCode: number;
}

export interface ILoginViaIdentifierDto {
  identifier: string;
  password: string;
}

export interface IAuthInfo {
  jwt: string;
  user: Omit<UsersEntity, "password" | "resetPasswordToken">;
}
