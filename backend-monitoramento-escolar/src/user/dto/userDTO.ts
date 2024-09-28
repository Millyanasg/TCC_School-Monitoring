import { User } from '@prisma/client';

export class UserDto {
  name: User['name'];
  lastName: User['lastName'];
  email: User['email'];
  type: User['type'];
  public static fromEntity(user: User): UserDto {
    const userDto = new UserDto();
    userDto.name = user.name;
    userDto.lastName = user.lastName;
    userDto.email = user.email;
    userDto.type = user.type;
    return userDto;
  }
}
