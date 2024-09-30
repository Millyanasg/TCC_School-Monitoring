import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { ChildDto } from './ChildDto';
import { HomeAddressDto } from './HomeAddressDto';

export class RegisterParentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HomeAddressDto)
  homeAddresses: HomeAddressDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChildDto)
  children: ChildDto[];
}
