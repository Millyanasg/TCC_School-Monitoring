import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { GuardParentUser } from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { User } from '@prisma/client';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get('/')
  @GuardParentUser()
  async fetchChildren(
    @GetRequestUser() user: User | null,
    @Query('childId') childId: number,
  ): Promise<unknown> {
    user = verifyUser(user);
    return await this.locationService.getLocation(user, childId);
  }
}
