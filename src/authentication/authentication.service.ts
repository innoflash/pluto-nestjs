import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  public constructor(private readonly usersService: UsersService) {}

  public async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }
}
