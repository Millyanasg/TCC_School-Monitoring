import { Request, User, PrismaClient } from '@prisma/client';

export class DriverRequestInfoViewDto {
  id: number;
  driver: User;
  parent: User;
  status: Request['status'];
  createdAt: Date;
  updatedAt: Date;
  static from(
    requests: Request,
    parent: User,
    driver: User,
  ): DriverRequestInfoViewDto {
    const { id, driverId, parentId, status, createdAt, updatedAt } = requests;
    return {
      id,
      driver: driver,
      parent: parent,
      status,
      createdAt,
      updatedAt,
    };
  }
}
