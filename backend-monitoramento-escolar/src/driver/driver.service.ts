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

  public async updateDriver(
    user: User,
    data: DriverDto,
  ): Promise<DriverViewDto> {
    const { car, color, model, plate, seats, year } = data;

    const driver = await this.prismaService.driver.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.driver.update({
      where: {
        userId: user.id,
      },
      data: {
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

  public async getDriver(user: User): Promise<DriverViewDto> {
    const driver = await this.prismaService.driver.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }

    return DriverViewDto.from(driver);
  }
}
