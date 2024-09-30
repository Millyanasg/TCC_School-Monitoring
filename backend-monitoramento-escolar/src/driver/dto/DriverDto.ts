import { IsInt, IsString, Max, Min } from 'class-validator';

export class DriverDto {
  @IsString()
  plate: string;

  @IsString()
  car: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  color: string;

  @IsInt()
  @Min(1)
  seats: number;
}
