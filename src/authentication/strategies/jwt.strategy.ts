import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RequestService } from '../../shared/request.service';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly requestService: RequestService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET')
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.usersService.findByEmail(payload.email, true);

    this.requestService.setUserId(user.id);

    this.requestService.setCurrentUserRoles(user.roles.map(role => role.name));

    delete user.roles;
    this.requestService.setUser(user);

    return user;
  }
}
