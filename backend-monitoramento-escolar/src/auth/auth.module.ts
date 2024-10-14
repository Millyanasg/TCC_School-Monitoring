import { CryptModule } from '@backend/crypt/crypt.module';
import { UserModule } from '@backend/user/user.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyUser } from './strategies/JWT.strategy';
import { JwtStrategyAdmin } from './strategies/JWT_ADMIN.strategy';
import { JwtStrategyDriver } from './strategies/JWT_DRIVER.strategy';
import { JwtStrategyParent } from './strategies/JWT_PARENT.strategy';

@Module({
  imports: [
    UserModule,
    CryptModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const JWT_SECRET = config.get('JWT_SECRET');
        const JWT_EXPIRES_IN = config.get('JWT_EXPIRATION_TIME');
        if (!JWT_SECRET) {
          Logger.error('JWT_SECRET is not set');
          throw new Error('JWT_SECRET is not set');
        }
        if (!JWT_EXPIRES_IN) {
          Logger.warn('JWT_EXPIRES_IN is not set, using default of 60s');
        }

        return {
          secret: JWT_SECRET,
          signOptions: { expiresIn: JWT_EXPIRES_IN },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategyUser,
    JwtStrategyParent,
    JwtStrategyAdmin,
    JwtStrategyDriver,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
