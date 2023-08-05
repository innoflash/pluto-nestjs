import { Injectable } from '@nestjs/common';
import { UserRole } from '../../../users/user-role';
import { BaseQueryFilterPolicy } from '../../base-query-filter.policy';
import { RequestService } from '../../request.service';

@Injectable()
export class ForCurrentUserFilterPolicy extends BaseQueryFilterPolicy {
  public constructor(private readonly requestService: RequestService) {
    super();
  }

  protected handleAuthorization(
    filterKey: string,
    filterValue: unknown
  ): boolean {
    if (this.requestService.getCurrentUserRoles().includes(UserRole.TEACHER)) {
      return true;
    }

    return +filterValue === this.requestService.getUserId();
  }
}
