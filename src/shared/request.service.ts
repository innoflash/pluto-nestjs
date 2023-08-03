import { Injectable, Scope } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/user-role';

@Injectable({
  scope: Scope.REQUEST
})
export class RequestService {
  private currentUserRoles: Array<UserRole> = [];
  private user?: User;
  private userId?: number;

  public setCurrentUserRoles(currentUserRoles: Array<UserRole>) {
    this.currentUserRoles = currentUserRoles;
  }

  public setUser(user: User) {
    this.user = user;
  }

  public setUserId(userId: number) {
    this.userId = userId;
  }

  public getCurrentUserRoles(): Array<UserRole> {
    return this.currentUserRoles;
  }

  public getUser(): User {
    return this.user;
  }

  public getUserId(): number {
    return this.userId;
  }
}
