import { BaseRelationPolicy } from '../../shared/base-relation.policy';
import { RequestService } from '../../shared/request.service';
import { UserRole } from '../../users/user-role';

export class RecipientRelationPolicy extends BaseRelationPolicy {
  public constructor(private readonly requestService: RequestService) {
    super();
  }

  protected handleAuthorization(relation: string): boolean {
    return this.requestService.getCurrentUserRoles().includes(UserRole.TEACHER);
  }
}
