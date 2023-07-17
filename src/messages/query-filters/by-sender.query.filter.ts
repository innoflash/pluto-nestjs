import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions } from 'typeorm';

export class BySenderQueryFilter extends BaseFilter {
  protected filterConditions(senderId: number): FindManyOptions {
    return {
      where: { senderId }
    };
  }
}
