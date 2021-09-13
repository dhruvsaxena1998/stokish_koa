import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export class SharedEntityProperties {
  @CreateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    type: "date",
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    type: "date",
    name: "updated_at",
  })
  updatedAt: Date;
}
