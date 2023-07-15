import { BaseFilter } from '../base-filter';
import { FindManyOptions } from 'typeorm';

export class OrderingFilter extends BaseFilter {
  public filterConditions(value: {
    order?: string;
    orderBy?: string;
  }): FindManyOptions {
    return {
      order: {
        [value.orderBy || 'id']: value.order || 'asc'
      }
    };
  }
}
