import { AbstractFilter } from '../abstract-filter';
import { FindOneOptions } from 'typeorm';

export class FindByIdFilter extends AbstractFilter {
  public filter(id: number | string, key = 'id'): FindOneOptions {
    return {
      where: {
        [key]: id
      }
    };
  }
}
