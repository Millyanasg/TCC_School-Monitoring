import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptService {
  private readonly logger = new Logger(CryptService.name);
  saltRounds: number;
  constructor(private readonly configService: ConfigService) {
    this.saltRounds = Number(
      this.configService.getOrThrow<number>('SALT_ROUNDS', 10),
    );
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  public comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
