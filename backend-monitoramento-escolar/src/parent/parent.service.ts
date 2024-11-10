import { PrismaService } from '@backend/prisma/prisma.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Parent, User } from '@prisma/client';

import { ChildDto } from './dto/ChildDto';
import { HomeAddressDto } from './dto/HomeAddressDto';
import { RegisterParentDto } from './dto/RegisterDto';

@Injectable()
export class ParentService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async registerNewParent(user: User, registerDto: RegisterParentDto) {
    const { homeAddresses, children } = registerDto;

    if (user.type !== 'unset') {
      throw new HttpException(
        'User is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!homeAddresses.length) {
      throw new HttpException(
        'At least one home address is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!children.length) {
      throw new HttpException(
        'At least one child is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    // verify if the user is already a parent
    const foundParentUser = await this.prismaService.parent.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (foundParentUser) {
      throw new HttpException('User is already a parent', HttpStatus.CONFLICT);
    }

    const parent = (await this.prismaService.$transaction((prisma) =>
      this.initializeParentData(user, homeAddresses, children)(prisma),
    )) as Parent;

    const parentUser = await this.prismaService.user.findUnique({
      where: {
        id: parent.userId,
      },
      include: {
        parent: {
          include: {
            children: true,
            homeAddress: true,
          },
        },
      },
    });

    return parentUser;
  }

  private initializeParentData(
    user: User,
    homeAddresses: HomeAddressDto[],
    children: ChildDto[],
  ) {
    return async (prisma: typeof this.prismaService.$transaction.arguments) => {
      const parent = await prisma.parent.create({
        data: {
          parent_user: {
            connect: {
              id: user.id,
            },
          },
          homeAddress: {
            createMany: {
              data: homeAddresses.map((homeAddress) => ({
                city: homeAddress.city,
                latitude: Number(homeAddress.latitude),
                longitude: Number(homeAddress.longitude),
                number: Number(homeAddress.number),
                state: homeAddress.state,
                street: homeAddress.street,
                zipCode: homeAddress.zipCode,
              })),
            },
          },
          children: {
            createMany: {
              data: children.map((child) => ({
                name: child.name,
                lastName: child.lastName,
                birthDate: new Date(child.birthDate),
                grade: child.grade,
                street: child.street,
                number: Number(child.number),
                city: child.city,
                state: child.state,
                latitude: Number(child.latitude),
                longitude: Number(child.longitude),
              })),
            },
          },
        },
      });

      // update user role to parent
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          type: 'parent',
        },
      });

      return parent;
    };
  }
}
