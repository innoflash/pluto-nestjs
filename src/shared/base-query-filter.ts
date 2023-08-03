import { ForbiddenException, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export abstract class BaseQueryFilter {
  protected abstract filterConditions(
    value: unknown
  ): FindManyOptions | FindOneOptions;

  public filter(
    value: unknown,
    errorOnAuthorizationFailure = true
  ): FindManyOptions | FindOneOptions {
    if (this.authorizeFilter()) {
      return this.filterConditions(value);
    }

    if (errorOnAuthorizationFailure) {
      throw new ForbiddenException(
        'You do not have permission to query using ' + value
      );
    }

    return {};
  }

  protected authorizeFilter(): boolean {
    return true;
  }
}
