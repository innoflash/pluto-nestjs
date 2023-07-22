import { Injectable } from '@nestjs/common';
import { BaseQueryFilter } from '../base-query-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class ByUserIdQueryFilter extends BaseQueryFilter {
  filterConditions(userId: number): FindManyOptions | FindOneOptions {
    return {
      where: { userId }
    };
  }
}
