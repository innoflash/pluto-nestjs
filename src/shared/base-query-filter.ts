import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export abstract class BaseQueryFilter {
  public constructor(@Inject(REQUEST) protected readonly request: Request) {}

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
