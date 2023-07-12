import { BaseFilter } from '../base-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class ByUserIdFilter extends BaseFilter {
  filter(userId: number): FindManyOptions | FindOneOptions {
    return {
      where: { userId }
    };
  }
}
