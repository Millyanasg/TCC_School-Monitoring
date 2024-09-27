import { Injectable } from '@nestjs/common';

import { ForgotPasswordDto } from './dto/ForgotPasswordDto';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';

@Injectable()
export class AuthService {
  async getUserFromToken(token: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async forgotPassword(body: ForgotPasswordDto): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async register(body: RegisterDto): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async login(query: LoginDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
