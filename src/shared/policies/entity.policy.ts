import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRole } from '../../users/user-role';
import { RequestService } from '../request.service';

@Injectable()
export class EntityPolicy<T> {
  public constructor(private readonly requestService: RequestService) {}

  public authorize(entity: T, userIdKey = 'userId') {
    console.log(entity);
    if (this.requestService.getCurrentUserRoles().includes(UserRole.TEACHER)) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (entity[userIdKey] !== this.requestService.getUserId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
