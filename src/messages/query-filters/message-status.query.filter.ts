import { FindManyOptions } from 'typeorm';
import { BaseQueryFilter } from '../../shared/base-query-filter';
import { ReadStatus } from '../enums/read-status';

export class MessageStatusQueryFilter extends BaseQueryFilter {
  protected filterConditions(value: ReadStatus): FindManyOptions {
    return {
      where: {
        status: value
      }
    };
  }
}
