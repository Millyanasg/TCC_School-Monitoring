import { Child, Request, User } from '@prisma/client';

export class InviteDriverDto {
  id: number;
  child: Child;
  driver: User;
  status: Request['status'];

  public static from(
    id: number,
    child: Child,
    driver: User,
    status: Request['status'],
  ) {
    const dto = new InviteDriverDto();
    dto.id = id;
    dto.child = child;
    dto.driver = driver;
    dto.status = status;
    return dto;
  }
}
