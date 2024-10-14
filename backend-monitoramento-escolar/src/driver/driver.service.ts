import { PrismaService } from '@backend/prisma/prisma.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { DriverDto } from './dto/DriverDto';
import { DriverRequestInfoViewDto } from './dto/DriverRequestInfoViewDto';
import { DriverRequestViewDto } from './dto/DriverRequestViewDto';
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

  public async declineDriverRequest(
    user: User,
    request_id: number,
  ): Promise<DriverRequestViewDto> {
    const driver = await this.prismaService.driver.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }

    const request = await this.prismaService.request.findUnique({
      where: {
        driverId: driver.id,
        id: request_id,
      },
    });

    if (!request) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }

    const updatedRequest = await this.prismaService.request.update({
      where: {
        id: request_id,
      },
      data: {
        status: 'disallowed',
      },
    });

    return DriverRequestViewDto.from(updatedRequest);
  }

  public async accpedDriverRequest(
    user: User,
    request_id: number,
  ): Promise<DriverRequestViewDto> {
    const driver = await this.prismaService.driver.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }

    const request = await this.prismaService.request.findUnique({
      where: {
        driverId: driver.id,
        id: request_id,
      },
    });

    if (!request) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }

    if (request.status === 'disallowed') {
      throw new HttpException(
        'Request already declined',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedRequest = await this.prismaService.request.update({
      where: {
        id: request_id,
      },
      data: {
        status: 'allowed',
      },
    });

    return DriverRequestViewDto.from(updatedRequest);
  }

  public async getDriverRequests(
    user: User,
  ): Promise<DriverRequestInfoViewDto[]> {
    const driver = await this.prismaService.driver.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }

    const requests = await this.prismaService.request.findMany({
      where: {
        driverId: driver.id,
      },
      include: {
        driver: {
          include: {
            user: true,
          },
        },
        parent: {
          include: {
            parent_user: true,
          },
        },
      },
    });

    if (!requests) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }

    return requests.map((request) =>
      DriverRequestInfoViewDto.from(
        request,
        request.parent.parent_user,
        request.driver.user,
      ),
    );
  }
}
