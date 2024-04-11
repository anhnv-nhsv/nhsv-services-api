import { Auditable } from 'src/utils/auditable.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PartnerEntity } from './partner.entity';

@Entity('seq_trackings')
export class SeqTrackingEntity extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'os_seq_no' })
  osSeqNo: string;

  @Column({ name: 'partner_id' })
  partnerId: number;

  @ManyToOne(() => PartnerEntity, (partner) => partner.seqTrackings)
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;
}
