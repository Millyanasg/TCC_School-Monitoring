import { GuardCommonUser } from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { DriverService } from './driver.service';
import { DriverDto } from './dto/DriverDto';

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
}
