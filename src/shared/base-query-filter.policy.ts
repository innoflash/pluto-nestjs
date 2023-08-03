import { ForbiddenException } from '@nestjs/common';

export abstract class BaseQueryFilterPolicy {
  protected abstract handleAuthorization(
    filterKey: string,
    filterValue: unknown
  ): boolean;

  public authorizeFilter(
    filterKey: string,
    filterValue: unknown,
    errorOnAuthorizationFailure = true
  ): boolean {
    if (this.handleAuthorization(filterKey, filterValue)) {
      return true;
    }

    if (errorOnAuthorizationFailure) {
      throw new ForbiddenException(
        `You not allowed to query \"${filterKey}\" with \"${filterValue}\"`
      );
    }

    return true;
  }
}
