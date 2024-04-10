import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class PartnerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('partner_nm')
  partnerName: string;
}
