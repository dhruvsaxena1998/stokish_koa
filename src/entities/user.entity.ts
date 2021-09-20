import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { SharedEntityProperties } from "./shared.entity";

import { UserRole } from "../@types/user.types";

export const config = {
  collectionName: "users",
  info: {
    name: "user",
    description: "",
  },
  privateArrtibutes: ["password", "resetPasswordToken", "totp"],
};

@Entity({ name: "users" })
export class UsersEntity extends SharedEntityProperties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", nullable: true })
  firstName: string;

  @Column({ name: "last_name", nullable: true })
  lastName: string;

  @Column({ name: "username", unique: true, nullable: true })
  username: string;

  @Column({ name: "email", unique: true, nullable: true })
  email: string;

  @Column({ name: "password", nullable: true, type: "text" })
  password: string;

  @Column({ name: "contact", unique: true, nullable: true })
  contact: string;

  @Column({ name: "country_code", nullable: true, type: "smallint" })
  countryCode: number;

  @Column({
    name: "role",
    enum: UserRole,
    default: UserRole.user,
    type: "enum",
  })
  role: UserRole;

  @Column({ name: "blocked", default: false, type: "boolean" })
  blocked: boolean;

  @Column({
    name: "reset_password_token",
    default: null,
    nullable: true,
    type: "text",
  })
  resetPasswordToken: string;

  @Column({
    name: "totp",
    default: null,
    nullable: true,
  })
  totp: string;
}
