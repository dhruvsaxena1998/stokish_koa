import { UpdateDateColumn, CreateDateColumn, Column } from 'typeorm';

export class SharedEntityProperties {
  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'date',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'date',
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    name: 'is_deleted',
    default: false,
    type: 'boolean',
  })
  isDeleted: boolean;
}
