import { Child } from '@prisma/client';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

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

  public static from(data: Child) {
    const childViewDto = new ChildViewDto();
    childViewDto.id = data.id;
    childViewDto.name = data.name;
    childViewDto.lastName = data.lastName;
    childViewDto.birthDate = data.birthDate;
    childViewDto.grade = data.grade;
    return childViewDto;
  }
}
