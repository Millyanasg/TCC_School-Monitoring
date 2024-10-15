import { PrismaModule } from '@backend/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  imports: [PrismaModule],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
