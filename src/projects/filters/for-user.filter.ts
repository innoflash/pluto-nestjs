import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class ForUserFilter extends BaseFilter {
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
