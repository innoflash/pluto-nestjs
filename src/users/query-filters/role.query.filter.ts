import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseQueryFilter } from '../../shared/base-query-filter';
import { InvalidRoleException } from '../../shared/exception-filters/invalid-role.exception';
import { UserRole } from '../user-role';

export class RoleQueryFilter extends BaseQueryFilter {
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
