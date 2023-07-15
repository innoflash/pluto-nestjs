import { BaseFilter } from '../base-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class ByUserIdFilter extends BaseFilter {
  filterConditions(userId: number): FindManyOptions | FindOneOptions {
    return {
      where: { userId }
    };
  }
}
