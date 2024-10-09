import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly password: string;
}
