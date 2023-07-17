import { UnprocessableEntityException } from '@nestjs/common';
import { UserRole } from '../../users/user-role';

export class InvalidRoleException extends UnprocessableEntityException {
  public constructor(givenRole: string) {
    super([
      `The role "${givenRole}" provided is in valid, it has to be one of ${Object.keys(
        UserRole
      )
        .map(role => role.toLowerCase())
        .join(', ')}`
    ]);
  }
}
