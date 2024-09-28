import { GetRequestUser, verifyUser } from '@backend/GetRequestUser';
import { Controller, Get, Inject } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get('me')
  getProfile(@GetRequestUser() user: User | null) {
    user = verifyUser(user);
    return this.userService.getProfile(user);
  }
}
