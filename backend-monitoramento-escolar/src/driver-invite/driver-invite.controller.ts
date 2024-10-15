import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import {
  GuardDriverUser,
  GuardParentUser,
} from '@backend/auth/strategies/Guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { DriverInviteService } from './driver-invite.service';
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
    return await this.driverInviteService.fetchInvitedDrivers(user);
  }

  @Post()
  @GuardParentUser()
  async inviteDriverByEmail(
    @GetRequestUser() user: User | null,
    @Body() body: InviteDriverByEmailDto,
  ) {
    user = verifyUser(user);
    return await this.driverInviteService.inviteDriverByEmail(
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
    return await this.driverInviteService.deleteDriverInvite(user, Number(id));
  }

  @Get('driver')
  @GuardDriverUser()
  async fetchDriverInvites(@GetRequestUser() user: User | null) {
    user = verifyUser(user);
    return await this.driverInviteService.fetchDriverInvites(user);
  }

  @Put('driver')
  @GuardDriverUser()
  async acceptDriverInvite(
    @GetRequestUser() user: User | null,
    @Query('id') inviteId: number,
  ) {
    user = verifyUser(user);
    return await this.driverInviteService.acceptDriverInvite(
      user,
      Number(inviteId),
    );
  }

  @Delete('driver')
  @GuardDriverUser()
  async declineDriverInvite(
    @GetRequestUser() user: User | null,
    @Query('id') inviteId: number,
  ) {
    user = verifyUser(user);
    return await this.driverInviteService.declineDriverInvite(
      user,
      Number(inviteId),
    );
  }
}
