import { UserModule } from '@backend/user/user.module';
import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [UserModule],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
