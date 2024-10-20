import { PrismaService } from '@backend/prisma/prisma.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}
  getLocation(user: User, childId: number): unknown {
    throw new Error('Method not implemented.');
  }
}
