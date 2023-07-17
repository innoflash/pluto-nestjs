import { FindManyOptions } from 'typeorm';
import { BaseFilter } from '../../shared/base-filter';
import { ReadStatus } from '../enums/read-status';

export class MessageStatusQueryFilter extends BaseFilter {
  protected filterConditions(value: ReadStatus): FindManyOptions {
    return {
      where: {
        status: value
      }
    };
  }
}
