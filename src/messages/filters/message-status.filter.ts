import { FindManyOptions } from 'typeorm';
import { AbstractFilter } from '../../shared/abstract-filter';
import { ReadStatus } from '../enums/read-status';

export class MessageStatusFilter extends AbstractFilter {
  public filter(value: ReadStatus): FindManyOptions {
    return {
      where: {
        status: value
      }
    };
  }
}
