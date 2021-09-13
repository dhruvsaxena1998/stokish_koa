import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { SharedEntityProperties } from "./shared.entity";

enum UserRole {
  admin = "admin",
  user = "user",
}

@Entity({ name: "users" })
export class UsersEntity extends SharedEntityProperties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", nullable: true })
  firstName: string;

  @Column({ name: "last_name", nullable: true })
  lastName: string;

  @Column({ name: "username", unique: true, nullable: false })
  username: string;

  @Column({ name: "email", unique: true, nullable: false })
  email: string;

  @Column({ name: "password", nullable: false, type: "text" })
  password: string;

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
}
