import { BaseQueryFilter } from '../../shared/base-query-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BoardType } from '../enums/board-type';

export class MessageTypeQueryFilter extends BaseQueryFilter {
  protected filterConditions(
    type: BoardType
  ): FindManyOptions | FindOneOptions {
    return {
      where: { type }
    };
  }
}
