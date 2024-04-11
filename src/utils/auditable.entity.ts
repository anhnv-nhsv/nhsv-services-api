import { instanceToPlain } from 'class-transformer';
import moment from 'moment-timezone';
import { BaseEntity, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Auditable extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date(moment().tz('Asia/Ho_Chi_Minh').format());
    this.updatedAt = new Date(moment().tz('Asia/Ho_Chi_Minh').format());
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date(moment().tz('Asia/Ho_Chi_Minh').format());
  }
}
