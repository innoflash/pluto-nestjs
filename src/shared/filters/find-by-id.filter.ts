import { BaseFilter } from '../base-filter';
import { FindOneOptions } from 'typeorm';

export class FindByIdFilter extends BaseFilter {
  public filter(id: number | string, key = 'id'): FindOneOptions {
    return {
      where: {
        [key]: id
      }
    };
  }
}
