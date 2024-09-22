import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpsGateway } from './gps/gps.gateway';
import { GpsModule } from './gps/gps.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { DriverModule } from './driver/driver.module';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    GpsModule,
    AuthModule,
    UserModule,
    SchoolModule,
    DriverModule,
    ParentModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService, GpsGateway],
})
export class AppModule {}
