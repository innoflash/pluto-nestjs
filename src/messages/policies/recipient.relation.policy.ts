import { BaseRelationPolicy } from '../../shared/base-relation.policy';

export class RecipientRelationPolicy extends BaseRelationPolicy {
  protected handleAuthorization(relation: string): boolean {
    console.log('We are using this policy', relation);

    return false;
  }
}
