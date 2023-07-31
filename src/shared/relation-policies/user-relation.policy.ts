import { Injectable } from '@nestjs/common';
import { BaseRelationPolicy } from '../base-relation.policy';

@Injectable()
export class UserRelationPolicy extends BaseRelationPolicy {
  protected handleAuthorization(relation: string): boolean {
    return false;
  }
}
