import { BaseQueryFilter } from '../../shared/base-query-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class ForUserQueryFilter extends BaseQueryFilter {
  protected filterConditions(userId: number): FindManyOptions | FindOneOptions {
    return {
      where: {
        members: {
          id: userId
        }
      }
    };
  }
}
