import { IsString } from 'class-validator';

export class LoginMemberDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly password: string;
}
