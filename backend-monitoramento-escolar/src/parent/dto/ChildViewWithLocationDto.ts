import { Child, ChildLocations } from '@prisma/client';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  // School location
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
  // Live location
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
      // School location
      street: data.street,
      number: data.number,
      city: data.city,
      state: data.state,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    return dataDto;
  }
}
