import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import { PrismaService } from '@backend/prisma/prisma.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { HomeAddressViewDto } from '../parent/dto/HomeAddressViewDto';

@Injectable()
export class HomeAddressService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async removeHomeAddress(
    user: User,
    data: HomeAddressViewDto,
  ): Promise<HomeAddressViewDto> {
    const { id: addressId } = data;

    const address = await this.prismaService.homeAddress.findUnique({
      where: {
        id: addressId,
        parentId: user.id,
      },
    });

    if (!address) {
      throw new HttpException('Home address not found', HttpStatus.NOT_FOUND);
    }

    const deletedAddress = await this.prismaService.homeAddress.delete({
      where: {
        id: addressId,
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
        parentId: parent.id,
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
        parentId: user.id,
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
    });

    return addresses.map((address) => HomeAddressViewDto.from(address));
  }
}
