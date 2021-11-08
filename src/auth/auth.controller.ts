import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, Token } from './dto/login.dto';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body:UserDto){
    return this.authService.register(body)
  }

  @Post('')
  login(@Body() body:LoginDto):Promise<Token | unknown>{
    return this.authService.login(body)
  }
}
