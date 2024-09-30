import { PrismaModule } from '@backend/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';

@Module({
  imports: [PrismaModule],
  providers: [ParentService],
  controllers: [ParentController],
})
export class ParentModule {}
