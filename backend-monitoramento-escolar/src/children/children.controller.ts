import { GuardParentUser } from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { ChildrenService } from './children.service';

@Controller('children')
@ApiTags('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get('/')
  @GuardParentUser()
  async fetchChildren(
    @GetRequestUser() user: User | null,
  ): Promise<ChildViewDto[]> {
    user = verifyUser(user);
    return await this.childrenService.fetchChildren(user);
  }

  @Put('/')
  @GuardParentUser()
  async updateChildren(
    @GetRequestUser() user: User | null,
    data: ChildViewDto,
  ): Promise<ChildViewDto> {
    user = verifyUser(user);
    return await this.childrenService.updateChildren(user, data);
  }

  @Post('/')
  @GuardParentUser()
  async addChildren(
    @GetRequestUser() user: User | null,
    data: ChildViewDto,
  ): Promise<ChildViewDto> {
    user = verifyUser(user);
    return await this.childrenService.addChildren(user, data);
  }

  @Delete('/')
  @GuardParentUser()
  async removeChildren(
    @GetRequestUser() user: User | null,
    data: ChildViewDto,
  ): Promise<ChildViewDto> {
    user = verifyUser(user);
    return await this.childrenService.removeChildren(user, data);
  }
}
