import { FindManyOptions } from 'typeorm';
import { BaseFilter } from '../../shared/base-filter';
import { ReadStatus } from '../enums/read-status';

export class MessageStatusFilter extends BaseFilter {
  public filter(value: ReadStatus): FindManyOptions {
    return {
      where: {
        status: value
      }
    };
  }
}
