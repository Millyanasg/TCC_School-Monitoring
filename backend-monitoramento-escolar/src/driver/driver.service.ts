import { PrismaService } from '@backend/prisma/prisma.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { DriverDto } from './dto/DriverDto';
import { DriverViewDto } from './dto/DriverViewDto';

@Injectable()
export class DriverService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async registerDriver(
    user: User,
    driverInfo: DriverDto,
  ): Promise<DriverViewDto> {
    const { car, color, model, plate, seats, year } = driverInfo;

    if (user.type !== 'unset') {
      throw new HttpException(
        'User is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    // verify if the user is already a driver
    const foundDriverUser = await this.prismaService.driver.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (foundDriverUser) {
      throw new HttpException('User is already a driver', HttpStatus.CONFLICT);
    }

    // update user type
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        type: 'driver',
      },
    });

    const driver = await this.prismaService.driver.create({
      data: {
        userId: user.id,
        car,
        color,
        model,
        plate,
        seats,
        year,
      },
    });

    return DriverViewDto.from(driver);
  }
}
