import { PrismaModule } from '@backend/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { ChildrenController } from './children.controller';
import { ChildrenService } from './children.service';

@Module({
  imports: [PrismaModule],
  providers: [ChildrenService],
  controllers: [ChildrenController],
})
export class ChildrenModule {}
