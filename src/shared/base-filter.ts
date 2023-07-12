import { FindManyOptions, FindOneOptions } from 'typeorm';

export abstract class BaseFilter {
  public constructor(protected readonly property?: string) {}

  abstract filter(value: unknown): FindManyOptions | FindOneOptions;
}
