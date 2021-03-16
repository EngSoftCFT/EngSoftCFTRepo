import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../authorize.service';

@Component({
  selector: "app-user-control-pane",
  templateUrl: "./user-control-pane.component.html",
  styleUrls: ["./user-control-pane.component.scss"],
})
export class UserControlPaneComponent implements OnInit {
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;

  constructor(private authorizeService: AuthorizeService) {}

  async ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();

    this.userName = this.authorizeService
      .getUser()
      .pipe(map((u) => u && u.name));

    (window as any).test = await this.authorizeService.getUser().toPromise();
    console.log((window as any).test);
  }

  login() {
    console.log("login");
  }

  logout() {
    console.log("logout");
  }

  profile() {
    console.log("profile");
  }

  register() {
    console.log("register");
  }
}
