import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-unauthorized-page",
  templateUrl: "./unauthorized-page.component.html",
  styleUrls: ["./unauthorized-page.component.scss"],
})
export class UnauthorizedPageComponent implements OnInit {
  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(["/"]);
  }

  ngOnInit() {}
}
