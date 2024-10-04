import { ChildDto } from '@backend/parent/dto/ChildDto';
import { PrismaService } from '@backend/prisma/prisma.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { ChildViewDto } from '../parent/dto/ChildViewDto';

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
    });

    return children.map(ChildViewDto.from);
  }
}
