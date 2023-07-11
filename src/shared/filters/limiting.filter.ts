import { AbstractFilter } from '../abstract-filter';
import { FindManyOptions } from 'typeorm';

export class LimitingFilter extends AbstractFilter {
  public filter(value: { page?: number; limit?: number }): FindManyOptions {
    return {
      skip: ((value.page || 1) - 1) * value.limit,
      take: value.limit
    };
  }
}
