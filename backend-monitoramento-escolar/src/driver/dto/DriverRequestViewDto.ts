import { Request } from '@prisma/client';

export class DriverRequestViewDto {
  id: number;
  driverId: number;
  parentId: number;
  status: Request['status'];
  createdAt: Date;
  updatedAt: Date;
  static from(requests: Request): DriverRequestViewDto {
    const { id, driverId, parentId, status, createdAt, updatedAt } = requests;
    return {
      id,
      driverId,
      parentId,
      status,
      createdAt,
      updatedAt,
    };
  }
}
