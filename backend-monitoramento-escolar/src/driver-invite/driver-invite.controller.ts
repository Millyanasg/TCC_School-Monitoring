import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { DriverInviteService } from './driver-invite.service';
import { GuardParentUser } from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { User } from '@prisma/client';
import { InviteDriverByEmailDto } from './dto/InviteDriverByEmailDto';

@Controller('driver-invite')
export class DriverInviteController {
  constructor(
    @Inject(DriverInviteService)
    private readonly driverInviteService: DriverInviteService,
  ) {}

  @Get()
  @GuardParentUser()
  async fetchInvitedDrivers(@GetRequestUser() user: User | null) {
    user = verifyUser(user);
    return this.driverInviteService.fetchInvitedDrivers(user);
  }

  @Post()
  @GuardParentUser()
  async inviteDriverByEmail(
    @GetRequestUser() user: User | null,
    @Body() body: InviteDriverByEmailDto,
  ) {
    user = verifyUser(user);
    return this.driverInviteService.inviteDriverByEmail(
      user,
      body.email,
      body.childId,
    );
  }

  @Delete()
  @GuardParentUser()
  async deleteDriverInvite(
    @GetRequestUser() user: User | null,
    @Query('id') id: number,
  ) {
    user = verifyUser(user);
    return this.driverInviteService.deleteDriverInvite(user, Number(id));
  }
}
