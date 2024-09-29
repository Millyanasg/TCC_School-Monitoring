import { IsInt, IsString, Max, Min } from 'class-validator';

export class ChildDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(25)
  age: number;

  @IsString()
  grade: string;
}
