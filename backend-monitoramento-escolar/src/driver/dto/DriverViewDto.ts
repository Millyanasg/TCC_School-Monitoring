import { Driver } from '@prisma/client';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class DriverViewDto {
  @IsInt()
  id: number;

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

  public static from(entity: Driver) {
    const dto = new DriverViewDto();
    dto.id = entity.id;
    dto.plate = entity.plate;
    dto.car = entity.car;
    dto.model = entity.model;
    dto.year = entity.year;
    dto.color = entity.color;
    dto.seats = entity.seats;
    return dto;
  }
}
