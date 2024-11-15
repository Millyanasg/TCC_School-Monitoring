import { ChildDto } from '@backend/parent/dto/ChildDto';
import { PrismaService } from '@backend/prisma/prisma.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Child, ChildLocations, User } from '@prisma/client';

import { ChildViewWithLocationDto } from '@backend/parent/dto/ChildViewWithLocationDto';
import { ChildViewDto } from '../parent/dto/ChildViewDto';

type ChildLocation = {
  id: number;
  latitude: number;
  longitude: number;
  updatedAt: Date;
  type: string;
};

export type ChildWithLocations = {
  id: number;
  name: string;
  lastName: string;
  birthDate: Date;
  grade: string;
  updatedAt: Date;
  ChildLocations: ChildLocation[];
};

@Injectable()
export class ChildrenService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async removeChildren(
    user: User,
    data: ChildViewDto,
  ): Promise<ChildViewDto> {
    const { id: childId } = data;

    const child = await this.prismaService.child.findUnique({
      where: {
        id: childId,
        parentId: user.id,
      },
    });

    if (!child) {
      throw new HttpException('Child not found', HttpStatus.NOT_FOUND);
    }

    const deletedChild = await this.prismaService.child.delete({
      where: {
        id: childId,
      },
    });

    return ChildViewDto.from(deletedChild);
  }

  public async addChildren(user: User, data: ChildDto): Promise<ChildViewDto> {
    const parent = await this.prismaService.parent.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!parent) {
      throw new HttpException('Parent not found', HttpStatus.NOT_FOUND);
    }

    const { name, lastName, birthDate, grade } = data;

    const newChild = await this.prismaService.child.create({
      data: {
        name,
        lastName,
        birthDate,
        grade,
        parentId: parent.id,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        number: data.number,
        state: data.state,
        street: data.street,
      },
    });

    return ChildViewDto.from(newChild);
  }

  public async updateChildren(
    user: User,
    data: ChildViewDto,
  ): Promise<ChildViewDto> {
    const { name, lastName, birthDate, grade } = data;
    const childId = data.id;

    const child = await this.prismaService.child.findUnique({
      where: {
        id: childId,
        parent: {
          userId: user.id,
        },
      },
    });

    if (!child) {
      throw new HttpException('Child not found', HttpStatus.NOT_FOUND);
    }

    const updatedChild = await this.prismaService.child.update({
      where: {
        id: childId,
        parent: {
          userId: user.id,
        },
      },
      data: {
        name,
        lastName,
        birthDate,
        grade,
      },
    });

    return ChildViewDto.from(updatedChild);
  }

  public async getChildren(user: User): Promise<ChildViewDto[]> {
    const children = await this.prismaService.child.findMany({
      where: {
        parent: {
          userId: user.id,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return children.map(ChildViewDto.from);
  }

  public async getChildrenWithLocation(
    user: User,
  ): Promise<ChildViewWithLocationDto[]> {
    const children = await this.prismaService.child.findMany({
      where: {
        parent: {
          userId: user.id,
        },
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        birthDate: true,
        grade: true,
        updatedAt: true,
        street: true,
        number: true,
        city: true,
        state: true,
        latitude: true,
        longitude: true,
        ChildLocations: {
          select: {
            id: true,
            childId: true,
            latitude: true,
            longitude: true,
            type: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            updatedAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const data = [];
    for (const child of children) {
      const childData: Child = child as unknown as Child;
      const location: ChildLocations = child.ChildLocations[0];
      const driver = await this.prismaService.user.findFirst({
        where: {
          driver: {
            assignedChildren: {
              some: {
                ChildLocations: {
                  some: {
                    childId: child.id,
                  },
                },
              },
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          lastName: true,
        },
      });
      data.push(ChildViewWithLocationDto.from(childData, location, driver));
    }
    return data;
  }
}
