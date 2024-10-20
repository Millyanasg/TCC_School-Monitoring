import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';
import { validate } from './config/env-validade';
import { CryptModule } from './crypt/crypt.module';
import { DriverModule } from './driver/driver.module';
import { GpsGateway } from './gps/gps.gateway';
import { GpsModule } from './gps/gps.module';
import { HomeAddressModule } from './home-address/home-address.module';
import { ParentModule } from './parent/parent.module';
import { ParseTokenPipe } from './parseToken';
import { PrismaModule } from './prisma/prisma.module';

import { DriverInviteModule } from './driver-invite/driver-invite.module';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validate: validate,
    }),
    GpsModule,
    AuthModule,
    UserModule,
    DriverModule,
    ParentModule,
    CryptModule,
    PrismaModule,
    ChildrenModule,
    HomeAddressModule,
    DriverInviteModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService, GpsGateway, ParseTokenPipe],
  exports: [ParseTokenPipe],
})
export class AppModule {}
