import { UserEntity } from '../entities/user.entity';

// DTO
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

export interface IConnectViaMagicLinkDto {
  email: string;
}

export type SanitizedUser = Omit<UserEntity,
'password' |
'resetPasswordToken' |
'totp'
>;

export interface IAuthInfo {
  jwt: string;
  user: SanitizedUser;
}
