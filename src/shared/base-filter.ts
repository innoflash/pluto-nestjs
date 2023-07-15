import { FindManyOptions, FindOneOptions } from 'typeorm';

export abstract class BaseFilter {
  public constructor(protected readonly property?: string) {}

  protected abstract filterConditions(
    value: unknown
  ): FindManyOptions | FindOneOptions;

  public filter(value: unknown): FindManyOptions | FindOneOptions {
    if (this.authorizeFilter()) {
      return this.filterConditions(value);
    }

    return {};
  }

  protected authorizeFilter(): boolean {
    return true;
  }
}
