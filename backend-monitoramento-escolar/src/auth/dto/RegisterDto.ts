import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail({})
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/\d/)
  password: string;
}
