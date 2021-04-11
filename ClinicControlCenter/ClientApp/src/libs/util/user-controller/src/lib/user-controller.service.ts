import { IAuthUser } from "./models/AuthUser";
import { Injectable } from "@angular/core";
import { AuthorizeService } from "src/api-authorization/authorize.service";

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

  public HasPermissionOf() {

  }
}
