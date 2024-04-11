import { Module } from '@nestjs/common';
import { EkycController } from './ekyc.controller';
import { EkycService } from './ekyc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeqTrackingEntity } from './entities/seq-tracking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeqTrackingEntity])],
  controllers: [EkycController],
  providers: [EkycService],
})
export class EkycModule {}
