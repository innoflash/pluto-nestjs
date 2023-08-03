import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  public login(@Req() request: Request) {
    return this.authenticationService.login(request.user);
  }
}
