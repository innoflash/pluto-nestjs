import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions } from 'typeorm';

export class ForRecipientFilter extends BaseFilter {
  public filter(recipientId: number): FindManyOptions {
    return {
      where: { recipientId }
    };
  }
}
