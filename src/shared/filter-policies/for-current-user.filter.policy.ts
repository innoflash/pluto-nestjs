import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../../users/entities/user.entity';
import { BaseQueryFilterPolicy } from '../base-query-filter.policy';

@Injectable()
export class ForCurrentUserFilterPolicy extends BaseQueryFilterPolicy {
  public constructor(@Inject(REQUEST) protected readonly request: Request) {
    super();
    console.log(request);
  }

  protected handleAuthorization(
    filterKey: string,
    filterValue: unknown
  ): boolean {
    console.log(filterKey, filterValue, this.request);

    return false;

    return filterValue === (this.request.user as User).id;
  }
}
