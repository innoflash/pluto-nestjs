import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class ForUserFilter extends BaseFilter {
  public filter(userId: number): FindManyOptions | FindOneOptions {
    return {
      where: {
        members: {
          id: userId
        }
      }
    };
  }
}
