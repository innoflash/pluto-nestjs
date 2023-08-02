import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(
    @Body() userCredentials: LoginRequestDto,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    @Request() request
  ) {
    return request.user;
  }
}
