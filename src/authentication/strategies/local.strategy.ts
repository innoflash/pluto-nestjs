import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private readonly authenticationService: AuthenticationService
  ) {
    super({
      usernameField: 'email'
    });
  }
}
