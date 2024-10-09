import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from '../member/member.service';
import { LoginMemberDto } from '../member/dto/login-member.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const member = await this.memberService.findOneById(id);
    if (member && (await bcrypt.compare(pass, member.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = member;
      return result;
    }
    return null;
  }

  async login(loginMemberDto: LoginMemberDto) {
    const member = await this.validateUser(
      loginMemberDto.id,
      loginMemberDto.password,
    );

    if (!member) {
      throw new Error('Invalid credentials');
    }
    const payload = { id: member.id, sub: member._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: loginMemberDto.id,
    };
  }
}
