import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions } from 'typeorm';

export class BySenderFilter extends BaseFilter {
  protected filterConditions(senderId: number): FindManyOptions {
    return {
      where: { senderId }
    };
  }
}
