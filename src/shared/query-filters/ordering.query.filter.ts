import { Injectable } from '@nestjs/common';
import { BaseQueryFilter } from '../base-query-filter';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class OrderingQueryFilter extends BaseQueryFilter {
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
