import { ForbiddenException, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST
})
export abstract class BaseRelationPolicy {
  protected abstract handleAuthorization(relation: string): boolean;

  public authorizeRelation(
    relation: string,
    errorOnAuthorizationFailure = true
  ) {
    if (this.handleAuthorization(relation)) {
      return true;
    }

    if (errorOnAuthorizationFailure) {
      throw new ForbiddenException(
        `You are not allowed to load the relation named ${relation}.`
      );
    }

    return true;
  }
}
