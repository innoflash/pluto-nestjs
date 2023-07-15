import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BoardType } from '../enums/board-type';

export class MessageTypeFilter extends BaseFilter {
  protected filterConditions(
    type: BoardType
  ): FindManyOptions | FindOneOptions {
    return {
      where: { type }
    };
  }
}
