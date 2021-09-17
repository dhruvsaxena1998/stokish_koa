import { UsersEntity } from "../../entities";

export enum UserRole {
  admin = "admin",
  user = "user",
}
export type SanitizedUser = Omit<
  UsersEntity,
  "password" | "resetPasswordToken"
>;
