import { ChildWithLocations } from '@backend/children/children.service';
import { Child, ChildLocations, User } from '@prisma/client';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ChildViewWithLocationDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  grade: string;

  location?: ChildLocations;

  driver: {
    id: number;
    email: string;
    name: string;
    lastName: string;
  } | null;

  public static from(
    data: Child,
    location: ChildLocations,
    driver: {
      id: number;
      email: string;
      name: string;
      lastName: string;
    } | null,
  ): ChildViewWithLocationDto {
    const dataDto: ChildViewWithLocationDto = {
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      birthDate: data.birthDate,
      grade: data.grade,
      location: location,
      driver: driver,
    };

    return dataDto;
  }
}
