import { IAuthUser } from "./models/AuthUser";
import { Injectable } from "@angular/core";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { USER_ROLES, USER_ROLES_LEVEL } from "./models/UserRolesEnum";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "src/libs/util/utils/src";

@Injectable({
  providedIn: "root",
})
export class UserControllerService {
  user: IAuthUser = null;

  constructor(private authorizeService: AuthorizeService) {
    this.authorizeService.getUser().subscribe((x) => {
      this.user = x;
    });
  }

  public getUser() {
    return this.user;
  }

  public HasPermissionOf(userRole?: USER_ROLES) {
    const observer = this.authorizeService.getUser().pipe(
      map((x: IAuthUser) => {
        const requiredPermLevel = USER_ROLES_LEVEL[userRole];

        if (isNullOrUndefined(requiredPermLevel)) {
          return !isNullOrUndefined(x?.name);
        }

        if (isNullOrUndefined(x?.role)) return false;

        const permLevel = parseInt(x.rolePermLevel, 10);

        if (isNaN(permLevel)) return false;

        return requiredPermLevel >= permLevel;
      })
    );

    return observer;
  }
}
