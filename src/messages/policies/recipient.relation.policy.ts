import { Injectable } from '@nestjs/common';
import { BaseRelationPolicy } from '../../shared/base-relation.policy';
import { RequestService } from '../../shared/request.service';
import { UserRole } from '../../users/user-role';

@Injectable()
export class RecipientRelationPolicy extends BaseRelationPolicy {
  public constructor(private readonly requestService: RequestService) {
    super();
  }

  protected handleAuthorization(relation: string): boolean {
    console.log(relation, 'the relation', this.requestService);

    return this.requestService.getCurrentUserRoles().includes(UserRole.TEACHER);
  }
}
