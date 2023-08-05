import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRole } from '../../users/user-role';
import { RequestService } from '../request.service';

@Injectable()
export class EntityPolicy<T = any> {
  public constructor(private readonly requestService: RequestService) {}

  public authorize(entity: T, userIdKey = 'userId') {
    if (this.requestService.getCurrentUserRoles().includes(UserRole.TEACHER)) {
      return entity;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (+entity[userIdKey] !== this.requestService.getUserId()) {
      throw new ForbiddenException(
        `You are not allowed to query this ${entity.constructor.name.toLowerCase()}`
      );
    }

    return entity;
  }
}
