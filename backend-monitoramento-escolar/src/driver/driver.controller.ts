import {
  GuardCommonUser,
  GuardDriverUser,
} from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { Body, Controller, Get, Inject, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { DriverService } from './driver.service';
import { DriverDto } from './dto/DriverDto';
import { DriverViewDto } from './dto/DriverViewDto';

@Controller('driver')
@ApiTags('driver')
export class DriverController {
  constructor(
    @Inject(DriverService)
    private readonly driverService: DriverService,
  ) {}

  @Post('/register')
  @GuardCommonUser()
  async registerDriver(
    @GetRequestUser() user: User | null,
    @Body() data: DriverDto,
  ): Promise<any> {
    user = verifyUser(user);
    return await this.driverService.registerDriver(user, data);
  }

  @Get('/')
  @GuardDriverUser()
  async getDriver(@GetRequestUser() user: User | null): Promise<DriverViewDto> {
    user = verifyUser(user);
    return await this.driverService.getDriver(user);
  }

  @Put('/')
  @GuardDriverUser()
  async updateDriver(
    @GetRequestUser() user: User | null,
    @Body() data: DriverDto,
  ): Promise<DriverViewDto> {
    user = verifyUser(user);
    return await this.driverService.updateDriver(user, data);
  }
}
