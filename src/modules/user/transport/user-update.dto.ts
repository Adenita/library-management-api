import { IsString, IsEmail } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  username?: string;

  @IsString()
  password?: string;

  @IsEmail()
  email?: string;
}
