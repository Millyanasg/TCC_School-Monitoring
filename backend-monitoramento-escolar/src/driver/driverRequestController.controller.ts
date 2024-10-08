import { GuardDriverUser } from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { Controller, Delete, Get, Inject, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { DriverService } from './driver.service';
import { DriverRequestViewDto } from './dto/DriverRequestViewDto';
import { DriverRequestInfoViewDto } from './dto/DriverRequestInfoViewDto';

@Controller('request')
@ApiTags('Driver')
export class DriverRequestController {
  constructor(
    @Inject(DriverService)
    private readonly driverService: DriverService,
  ) {}

  @Get('/')
  @GuardDriverUser()
  async getDriverRequest(
    @GetRequestUser() user: User | null,
  ): Promise<DriverRequestInfoViewDto[]> {
    user = verifyUser(user);
    return await this.driverService.getDriverRequests(user);
  }

  @Put('/')
  @GuardDriverUser()
  async accpedDriverRequest(
    @GetRequestUser() user: User | null,
    @Query('id') id: number,
  ): Promise<DriverRequestViewDto> {
    user = verifyUser(user);
    return await this.driverService.accpedDriverRequest(user, id);
  }

  @Delete('/')
  @GuardDriverUser()
  async declineDriverRequest(
    @GetRequestUser() user: User | null,
    @Query('id') id: number,
  ): Promise<DriverRequestViewDto> {
    user = verifyUser(user);
    return await this.driverService.declineDriverRequest(user, id);
  }
}
