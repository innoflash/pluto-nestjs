import { Injectable } from '@nestjs/common';
import { BaseQueryFilter } from '../base-query-filter';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class LimitingQueryFilter extends BaseQueryFilter {
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
