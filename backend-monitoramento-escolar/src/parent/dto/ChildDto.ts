import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class ChildDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(25)
  age: number;

  @IsString()
  @IsNotEmpty()
  grade: string;
}
