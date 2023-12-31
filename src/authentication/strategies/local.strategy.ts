import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private readonly authenticationService: AuthenticationService
  ) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authenticationService.validate(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return user;
  }
}
