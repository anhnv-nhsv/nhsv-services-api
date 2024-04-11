import { Auditable } from 'src/utils/auditable.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SeqTrackingEntity } from './seq-tracking.entity';

@Entity('partners')
export class PartnerEntity extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'partner_nm' })
  partnerName: string;

  @OneToMany(() => SeqTrackingEntity, (seq) => seq.partner)
  seqTrackings: SeqTrackingEntity[];
}
