import { BaseQueryFilter } from '../../shared/base-query-filter';
import { FindManyOptions } from 'typeorm';

export class BySenderQueryFilter extends BaseQueryFilter {
  protected filterConditions(senderId: number): FindManyOptions {
    return {
      where: { senderId }
    };
  }
}
