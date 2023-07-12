import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions } from 'typeorm';

export class BySenderFilter extends BaseFilter {
  public filter(senderId: number): FindManyOptions {
    return {
      where: { senderId }
    };
  }
}
