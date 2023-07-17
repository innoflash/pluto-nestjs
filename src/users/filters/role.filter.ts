import { BaseFilter } from '../../shared/base-filter';
import { UserRole } from '../user-role';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';

export class RoleFilter extends BaseFilter {
  protected filterConditions(
    roleName: UserRole
  ): FindManyOptions | FindOneOptions {
    if (!Object.values(UserRole).includes(roleName)) {
      throw new UnprocessableEntityException('The role provided is in valid');
    }

    return {
      relations: {
        roles: {
          name: roleName
        }
      }
    };
  }
}
