import { Injectable } from '@nestjs/common';
import { BaseRelationPolicy } from '../../../shared/base-relation.policy';
import { RequestService } from '../../../shared/request.service';
import { UserRole } from '../../../users/user-role';

@Injectable()
export class MemberProfileRelationPolicy extends BaseRelationPolicy {
  public constructor(private readonly requestService: RequestService) {
    super();
  }

  protected handleAuthorization(relation: string): boolean {
    return this.requestService.getCurrentUserRoles().includes(UserRole.TEACHER);
  }
}
