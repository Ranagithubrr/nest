import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  GetUsers() {
    return this.authService.GetUsers();
  }

  @Post('register')
  CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.CreateUser(createUserDto)
  }

  @Post('login')
  LoginUser(@Body() loginDto: LoginDto) {
    return this.authService.LoginUser(loginDto)
  }
}
