import { Injectable } from '@nestjs/common';
import { BaseQueryFilter } from '../base-query-filter';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class FindByIdQueryFilter extends BaseQueryFilter {
  private key = 'id';

  public setKey(key: string): FindByIdQueryFilter {
    this.key = key;

    return this;
  }

  public filterConditions(id: number | string): FindOneOptions {
    return {
      where: {
        [this.key]: id
      }
    };
  }
}
