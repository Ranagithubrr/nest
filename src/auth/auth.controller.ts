import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Get('login')
  loginUser() {
    return this.authService.login();
  }
  @Get('logout')
  logoutUser() {
    return this.authService.logout();
  }
}
