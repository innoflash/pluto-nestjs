import { BaseFilter } from '../base-filter';
import { FindOneOptions } from 'typeorm';

export class FindByIdFilter extends BaseFilter {
  private key = 'id';

  public setKey(key: string): FindByIdFilter {
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
