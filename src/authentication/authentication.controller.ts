import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login() {
    return {};
  }
}
