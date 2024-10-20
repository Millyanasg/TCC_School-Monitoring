import { GuardParentUser } from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { ChildrenService } from './children.service';
import { ChildViewWithLocationDto } from '@backend/parent/dto/ChildViewWithLocationDto';

@Controller('children')
@ApiTags('children')
export class ChildrenController {
  private readonly logger = new Logger(ChildrenController.name);
  constructor(private readonly childrenService: ChildrenService) {}

  @Get('/')
  @GuardParentUser()
  async fetchChildren(
    @GetRequestUser() user: User | null,
    @Query('location') location?: boolean,
  ): Promise<ChildViewDto[] | ChildViewWithLocationDto[]> {
    user = verifyUser(user);
    if (location) {
      this.logger.debug('Fetching children with location');
      return await this.childrenService.getChildrenWithLocation(user);
    } else {
      this.logger.debug('Fetching children without location');
      return await this.childrenService.getChildren(user);
    }
  }

  @Put('/')
  @GuardParentUser()
  async updateChildren(
    @GetRequestUser() user: User | null,
    @Body() data: ChildViewDto,
  ): Promise<ChildViewDto> {
    user = verifyUser(user);
    return await this.childrenService.updateChildren(user, data);
  }

  @Post('/')
  @GuardParentUser()
  async addChildren(
    @GetRequestUser() user: User | null,
    @Body() data: ChildViewDto,
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
