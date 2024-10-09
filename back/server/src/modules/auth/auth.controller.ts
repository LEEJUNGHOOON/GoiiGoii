import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginMemberDto } from '../member/dto/login-member.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginMemberDto: LoginMemberDto, @Res() res) {
    try {
      const token = await this.authService.login(loginMemberDto);
      res.status(HttpStatus.OK).json(token);
    } catch (err) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: err.message });
    }
  }
  @Get('logout')
  async logout(@Res() res) {
    // 쿠키에서 JWT 토큰 제거
    res.clearCookie('token');
    return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }
}
