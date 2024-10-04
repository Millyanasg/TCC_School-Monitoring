import { HomeAddress } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HomeAddressViewDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

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

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  public static from(data: HomeAddress): HomeAddressViewDto {
    const { id, street, number, city, state, zipCode, latitude, longitude } =
      data;

    return {
      id,
      street,
      number,
      city,
      state,
      zipCode,
      latitude,
      longitude,
    };
  }
}
