import { Injectable } from '@nestjs/common';
import { BaseQueryFilterPolicy } from '../base-query-filter.policy';
import { RequestService } from '../request.service';

@Injectable()
export class ForCurrentUserFilterPolicy extends BaseQueryFilterPolicy {
  public constructor(private readonly requestService: RequestService) {
    super();
  }

  protected handleAuthorization(
    filterKey: string,
    filterValue: unknown
  ): boolean {
    return +filterValue === this.requestService.getUserId();
  }
}
