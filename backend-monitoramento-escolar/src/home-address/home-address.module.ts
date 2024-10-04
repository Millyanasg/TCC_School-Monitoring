import { PrismaModule } from '@backend/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { HomeAddressController } from './home-address.controller';
import { HomeAddressService } from './home-address.service';

@Module({
  imports: [PrismaModule],
  providers: [HomeAddressService],
  controllers: [HomeAddressController],
})
export class HomeAddressModule {}
