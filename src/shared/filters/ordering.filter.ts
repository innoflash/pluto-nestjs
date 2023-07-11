import { AbstractFilter } from '../abstract-filter';
import { FindManyOptions } from 'typeorm';

export class OrderingFilter extends AbstractFilter {
  public filter(value: { order?: string; orderBy?: string }): FindManyOptions {
    return {
      order: {
        [value.orderBy || 'id']: value.order || 'asc'
      }
    };
  }
}
