import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { UserForLoginDto } from 'src/entities/dto/userForLoginDto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userForLoginDto: UserForLoginDto) {
    console.log('userForLoginDto : ' + userForLoginDto.email);
    const userToLogin = await this.authService.login(userForLoginDto);
    if (!userToLogin.success) {
      throw new BadRequestException(userToLogin.message);
    }

    const result = await this.authService.createAccessToken(userToLogin.data);
    if (result.success) {
      return result;
    }

    throw new BadRequestException(result.message);
  }
}
