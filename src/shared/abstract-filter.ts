import { FindManyOptions, FindOneOptions } from 'typeorm';

export abstract class AbstractFilter {
  public constructor(protected readonly property: string) {}

  abstract filter(value: unknown): FindManyOptions | FindOneOptions;
}
