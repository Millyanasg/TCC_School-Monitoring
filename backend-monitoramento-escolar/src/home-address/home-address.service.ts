import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import { PrismaService } from '@backend/prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { HomeAddressViewDto } from '../parent/dto/HomeAddressViewDto';

@Injectable()
export class HomeAddressService {
  private readonly logger = new Logger(HomeAddressService.name);
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async removeHomeAddress(
    user: User,
    data: HomeAddressViewDto,
  ): Promise<HomeAddressViewDto> {
    this.logger.debug('Removing home address', data);
    data.id = Number(data.id);

    const address = await this.prismaService.homeAddress.findUnique({
      where: {
        id: data.id,
        parent: {
          userId: user.id,
        },
      },
    });

    if (!address) {
      throw new HttpException('Home address not found', HttpStatus.NOT_FOUND);
    }

    const deletedAddress = await this.prismaService.homeAddress.delete({
      where: {
        id: data.id,
      },
    });

    return HomeAddressViewDto.from(deletedAddress);
  }

  public async addHomeAddress(
    user: User,
    data: HomeAddressDto,
  ): Promise<HomeAddressViewDto> {
    const parent = await this.prismaService.parent.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!parent) {
      throw new HttpException('Parent not found', HttpStatus.NOT_FOUND);
    }

    this.logger.debug('Creating home address for parent', parent);

    const { street, number, city, state, zipCode, latitude, longitude } = data;

    const newAddress = await this.prismaService.homeAddress.create({
      data: {
        street,
        number,
        city,
        state,
        zipCode,
        latitude,
        longitude,
        parent: {
          connect: {
            id: parent.id,
          },
        },
      },
    });

    return HomeAddressViewDto.from(newAddress);
  }

  public async updateHomeAddress(
    user: User,
    data: HomeAddressViewDto,
  ): Promise<HomeAddressViewDto> {
    const { street, number, city, state, zipCode, latitude, longitude } = data;
    const addressId = data.id;

    const address = await this.prismaService.homeAddress.findUnique({
      where: {
        id: addressId,
        parent: {
          userId: user.id,
        },
      },
    });

    if (!address) {
      throw new HttpException('Home address not found', HttpStatus.NOT_FOUND);
    }

    const updatedAddress = await this.prismaService.homeAddress.update({
      where: {
        id: addressId,
      },
      data: {
        street,
        number,
        city,
        state,
        zipCode,
        latitude,
        longitude,
      },
    });

    return HomeAddressViewDto.from(updatedAddress);
  }

  public async getHomeAddress(user: User): Promise<HomeAddressViewDto[]> {
    const parent = await this.prismaService.parent.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!parent) {
      throw new HttpException('Parent not found', HttpStatus.NOT_FOUND);
    }

    const addresses = await this.prismaService.homeAddress.findMany({
      where: {
        parentId: parent.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return addresses.map((address) => HomeAddressViewDto.from(address));
  }
}
