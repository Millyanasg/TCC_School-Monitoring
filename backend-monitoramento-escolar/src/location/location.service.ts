import { PrismaService } from '@backend/prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Location } from './dto/Location';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}
  public async getLocation(user: User, childId: number): Promise<Location> {
    this.logger.log(
      `User ${user.id} is fetching location for child ${childId}`,
    );
    const lastLoc = await this.prismaService.childLocations.findFirst({
      where: {
        childId,
        child: {
          parent: {
            parent_user: {
              id: user.id,
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    if (!lastLoc) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }
    if (lastLoc.type === 'dropoff') {
      return Location.from(lastLoc);
    }
    return Location.from(lastLoc);
  }

  public async checkChildOut(
    user: User,
    childId: number,
    latitude: number,
    longitude: number,
  ) {
    this.logger.log(`User ${user.id} is checking out child ${childId}`);
    const lastLoc = await this.prismaService.childLocations.findFirst({
      where: {
        childId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    if (!lastLoc) {
      await this.prismaService.childLocations.create({
        data: {
          childId,
          latitude,
          longitude,
          type: 'dropoff',
        },
      });
      return;
    }

    if (lastLoc.type === 'pickup') {
      throw new HttpException(
        'Child already checked out',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prismaService.childLocations.create({
      data: {
        childId,
        latitude,
        longitude,
        type: 'dropoff',
      },
    });
  }

  public async cancelTrip(user: User, childId: number): Promise<unknown> {
    this.logger.log(`User ${user.id} is canceling trip for child ${childId}`);
    const lastLoc = await this.prismaService.childLocations.findFirst({
      where: {
        childId,
        child: {
          parent: {
            parent_user: {
              id: user.id,
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    if (!lastLoc) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }
    if (lastLoc.type === 'dropoff') {
      throw new HttpException('Trip already canceled', HttpStatus.BAD_REQUEST);
    }
    await this.prismaService.childLocations.create({
      data: {
        childId,
        latitude: lastLoc.latitude,
        longitude: lastLoc.longitude,
        type: 'dropoff',
      },
    });

    return;
  }
}
