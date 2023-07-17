import { BaseFilter } from '../base-filter';
import { FindManyOptions } from 'typeorm';

export class LimitingQueryFilter extends BaseFilter {
  public filterConditions(value: {
    page?: number;
    limit?: number;
  }): FindManyOptions {
    return {
      skip: ((value.page || 1) - 1) * (value.limit || 20),
      take: value.limit || 20
    };
  }
}
