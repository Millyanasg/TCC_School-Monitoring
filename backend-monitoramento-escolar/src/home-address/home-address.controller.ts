import { GuardParentUser } from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import { HomeAddressViewDto } from '@backend/parent/dto/HomeAddressViewDto';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { HomeAddressService } from './home-address.service';

@Controller('home-address')
@ApiTags('home-address')
export class HomeAddressController {
  constructor(private readonly homeAddressService: HomeAddressService) {}

  @Get('/')
  @GuardParentUser()
  async fetchHomeAddress(
    @GetRequestUser() user: User | null,
  ): Promise<HomeAddressViewDto[]> {
    user = verifyUser(user);
    return await this.homeAddressService.getHomeAddress(user);
  }

  @Put('/')
  @GuardParentUser()
  async updateHomeAddress(
    @GetRequestUser() user: User | null,
    @Body() data: HomeAddressViewDto,
  ): Promise<HomeAddressViewDto> {
    user = verifyUser(user);
    return await this.homeAddressService.updateHomeAddress(user, data);
  }

  @Post('/')
  @GuardParentUser()
  async addHomeAddress(
    @GetRequestUser() user: User | null,
    @Body() data: HomeAddressDto,
  ): Promise<HomeAddressViewDto> {
    user = verifyUser(user);
    return await this.homeAddressService.addHomeAddress(user, data);
  }

  @Delete('/')
  @GuardParentUser()
  async removeHomeAddress(
    @GetRequestUser() user: User | null,
    data: HomeAddressViewDto,
  ): Promise<HomeAddressViewDto> {
    user = verifyUser(user);
    return await this.homeAddressService.removeHomeAddress(user, data);
  }
}
