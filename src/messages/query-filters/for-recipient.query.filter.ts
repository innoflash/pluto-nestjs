import { BaseQueryFilter } from '../../shared/base-query-filter';
import { FindManyOptions } from 'typeorm';

export class ForRecipientQueryFilter extends BaseQueryFilter {
  protected filterConditions(recipientId: number): FindManyOptions {
    return {
      where: { recipientId }
    };
  }
}
