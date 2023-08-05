import { Injectable } from '@nestjs/common';
import { UserRole } from '../../../users/user-role';
import { BaseRelationPolicy } from '../../base-relation.policy';
import { RequestService } from '../../request.service';

@Injectable()
export class TeachersAllowedRelationsPolicy extends BaseRelationPolicy {
  public constructor(private readonly requestService: RequestService) {
    super();
  }

  protected handleAuthorization(): boolean {
    return this.requestService.getCurrentUserRoles().includes(UserRole.TEACHER);
  }
}
