import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions } from 'typeorm';

export class ForRecipientQueryFilter extends BaseFilter {
  protected filterConditions(recipientId: number): FindManyOptions {
    return {
      where: { recipientId }
    };
  }
}
