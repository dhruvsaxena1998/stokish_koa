import { UsersEntity } from "../entities/user.entity";

export enum UserRole {
  admin = "admin",
  user = "user",
}

export type SanitizedUser = Omit<
  UsersEntity,
  "password" | "resetPasswordToken" | "totp"
>;
