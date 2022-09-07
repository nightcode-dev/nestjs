import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto:CreateUserDto):Promise<void>{
    return this.authService.signup(createUserDto)
  }

  @Post('/signin')
  signin(@Body() createUserDto:CreateUserDto):Promise<string>{
    return this.authService.signin(createUserDto)
  }
}
