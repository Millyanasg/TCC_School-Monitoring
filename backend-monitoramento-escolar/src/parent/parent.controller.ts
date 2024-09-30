import { GuardCommonUser } from '@backend/auth/strategies/Guards';
import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { RegisterParentDto } from './dto/RegisterDto';
import { ParentService } from './parent.service';

@Controller('parent')
@ApiTags('Parent')
export class ParentController {
  constructor(
    @Inject(ParentService)
    private readonly parentService: ParentService,
  ) {}

  @Post('register')
  @GuardCommonUser()
  async register(
    @GetRequestUser() user: User | null,
    @Body() registerDto: RegisterParentDto,
  ) {
    user = verifyUser(user);
    return await this.parentService.registerNewParent(user, registerDto);
  }
}
