import { ChildWithLocations } from '@backend/children/children.service';
import { Child } from '@prisma/client';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChildViewDto {
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

  public static from(data: Child) {
    const childViewDto = new ChildViewDto();
    childViewDto.id = data.id;
    childViewDto.name = data.name;
    childViewDto.lastName = data.lastName;
    childViewDto.birthDate = data.birthDate;
    childViewDto.grade = data.grade;

    childViewDto.street = data.street;
    childViewDto.number = data.number;
    childViewDto.city = data.city;
    childViewDto.state = data.state;
    childViewDto.latitude = data.latitude;
    childViewDto.longitude = data.longitude;
    return childViewDto;
  }
}
