import { BaseQueryFilter } from '../base-query-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class ByUserIdQueryFilter extends BaseQueryFilter {
  filterConditions(userId: number): FindManyOptions | FindOneOptions {
    return {
      where: { userId }
    };
  }
}
