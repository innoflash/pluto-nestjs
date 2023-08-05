import { Injectable } from '@nestjs/common';
import { BaseQueryFilterPolicy } from '../../../shared/base-query-filter.policy';
import { RequestService } from '../../../shared/request.service';
import { UserRole } from '../../../users/user-role';

@Injectable()
export class SenderFilterPolicy extends BaseQueryFilterPolicy {
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
