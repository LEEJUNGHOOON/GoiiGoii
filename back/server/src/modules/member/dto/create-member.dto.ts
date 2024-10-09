export class CreateMemberDto {
  readonly id: string;
  password: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly admin?: boolean;
  readonly cart: string[];
}
