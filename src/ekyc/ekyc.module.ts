import { Module } from '@nestjs/common';
import { EkycController } from './ekyc.controller';
import { EkycService } from './ekyc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeqTrackingEntity } from './entities/seq-tracking.entity';
import { PartnerEntity } from './entities/partner.entity';
import { CustomerEntity } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeqTrackingEntity, PartnerEntity, CustomerEntity])],
  controllers: [EkycController],
  providers: [EkycService],
})
export class EkycModule {}
