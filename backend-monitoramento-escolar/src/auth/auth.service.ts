import { CryptService } from '@backend/crypt/crypt.service';
import { UserService } from '@backend/user/user.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { ForgotPasswordDto } from './dto/ForgotPasswordDto';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';
import { TokenPayload } from './strategies/TokenPayload';

@Injectable()
export class AuthService {
  private JWT_SECRET: string;
  private JWT_EXPIRES_IN: string;
  private JWT_REFRESH_SECRET: string;
  private JWT_REFRESH_EXPIRES_IN: string;
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(CryptService)
    private readonly cryptService: CryptService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = this.configService.getOrThrow<string>('JWT_SECRET');

    this.JWT_EXPIRES_IN = this.configService.getOrThrow<string>(
      'JWT_EXPIRATION_TIME',
    );

    this.JWT_REFRESH_SECRET =
      this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');

    this.JWT_REFRESH_EXPIRES_IN = this.configService.getOrThrow<string>(
      'JWT_REFRESH_EXPIRATION_TIME',
    );
  }

  private async generateTokens(payload: TokenPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.JWT_SECRET,
        expiresIn: this.JWT_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.JWT_REFRESH_SECRET,
        expiresIn: this.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async getUserFromToken(token: string) {
    const payload = this.jwtService.decode<TokenPayload>(token);

    if (!payload) {
      return null;
    }

    if (!payload.type) {
      return null;
    }

    const { email } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }

  async forgotPassword(body: ForgotPasswordDto): Promise<any> {
    const { email } = body;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    // generate token
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  async register(body: RegisterDto): Promise<any> {
    const { name, lastName, email, password } = body;
    // verify if user already exists with this email
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      throw new Error('User already exists');
    }

    // create user
    // hash password
    const hashedPassword = await this.cryptService.hashPassword(password);

    await this.userService.createUser({
      name,
      lastName,
      email,
      password: hashedPassword,
      type: 'unset',
    });
  }

  public async login(query: LoginDto): Promise<any> {
    const { email, password } = query;

    // get user by email
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    // compare password
    const isPasswordValid = await this.cryptService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // generate tokens
    const payload: TokenPayload = {
      email: user.email,
      type: user.type,
    };

    const tokens = await this.generateTokens(payload);

    return {
      ...tokens,
      user,
    };
  }

  public async refresh(req: Request, res: Response) {
    const refreshTokenHeader = req.headers?.authorization as string;
    const refreshTokenCookie = req.cookies?.refresh_token as string;

    const refreshToken = refreshTokenHeader
      ? refreshTokenHeader.split(' ')[1]
      : refreshTokenCookie;

    if (!refreshToken) {
      throw new HttpException('No refresh token', HttpStatus.UNAUTHORIZED);
    }

    const payload = this.jwtService.decode(refreshToken) as TokenPayload;

    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.getUserByEmail(payload.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.generateTokens(payload);

    return {
      ...tokens,
      user,
    };
  }
}
