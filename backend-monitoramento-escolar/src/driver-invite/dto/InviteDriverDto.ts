import { Child, Driver, Request, User } from '@prisma/client';

export class InviteDriverDto {
  child: Child;
  driver: User;
  status: Request['status'];

  public static from(child: Child, driver: User, status: Request['status']) {
    const dto = new InviteDriverDto();
    dto.child = child;
    dto.driver = driver;
    dto.status = status;
    return dto;
  }
}
