import { Inject, Injectable } from '@nestjs/common';

import { ForgotPasswordDto } from './dto/ForgotPasswordDto';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';
import { UserService } from '@backend/user/user.service';
import { CryptService } from '@backend/crypt/crypt.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(CryptService)
    private readonly cryptService: CryptService,
  ) {}
  async getUserFromToken(token: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async forgotPassword(body: ForgotPasswordDto): Promise<any> {
    const { email } = body;
  }

  async register(body: RegisterDto): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async login(query: LoginDto): Promise<any> {
    const { email, password } = query;
  }
}
