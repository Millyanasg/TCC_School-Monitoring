import { Module } from '@nestjs/common';

import { GpsController } from './gps.controller';
import { GpsService } from './gps.service';

@Module({
  providers: [GpsService],
  controllers: [GpsController],
})
export class GpsModule {}
