import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class HomeAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @Matches(/^-?\d{1,3}\.\d{6}$/)
  latitude: string;

  @IsString()
  @Matches(/^-?\d{1,3}\.\d{6}$/)
  longitude: string;
}
