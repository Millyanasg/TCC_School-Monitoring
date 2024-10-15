import { Module } from '@nestjs/common';
import { DriverInviteService } from './driver-invite.service';
import { DriverInviteController } from './driver-invite.controller';
import { PrismaModule } from '@backend/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DriverInviteService],
  controllers: [DriverInviteController],
})
export class DriverInviteModule {}
