import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseFilter } from '../../shared/base-filter';
import { InvalidRoleException } from '../../shared/exception-filters/invalid-role.exception';
import { UserRole } from '../user-role';

export class RoleQueryFilter extends BaseFilter {
  protected filterConditions(
    roleName: UserRole
  ): FindManyOptions | FindOneOptions {
    if (!Object.values(UserRole).includes(roleName)) {
      throw new InvalidRoleException(roleName);
    }

    return {
      where: {
        roles: {
          name: roleName
        }
      }
    };
  }
}
