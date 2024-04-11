import { Repository } from 'typeorm';
import { SeqTrackingEntity } from '../entities/seq-tracking.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class SeqTrackingRepository extends Repository<SeqTrackingEntity> {
  constructor(
    @InjectRepository(SeqTrackingEntity)
    private seqTrackingRepository: Repository<SeqTrackingEntity>,
  ) {
    super(seqTrackingRepository.target, seqTrackingRepository.manager, seqTrackingRepository.queryRunner);
  }
}
