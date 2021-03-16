import { Component, Input, OnInit } from "@angular/core";
import { INamedRoute } from "src/libs/ui/fea-menu/src";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "fea-header",
  templateUrl: "./fea-header.component.html",
  styleUrls: ["./fea-header.component.scss"],
})
export class FeaHeaderComponent {
  operationalUnit = 0;

  user = "Usuário";

  public get pageGroup() {
    return this.currentRoute?.Parent ? this.currentRoute.Parent.name : null;
  }

  public get pageName() {
    return this.currentRoute?.name;
  }

  @Input() operationalUnits: { name: string; id: number }[];

  @Input() currentRoute: INamedRoute | null | undefined;

  @Input() helpLink = "";

  constructor() {
    // TODO: Remove HardCoded
    this.operationalUnits = [{ name: "Aki", id: 1 }];
    this.helpLink =
      "https://www.google.com/search?q=help&oq=help&aqs=chrome..69i57j69i65j69i60l2.445j0j7&sourceid=chrome&ie=UTF-8";

    this.operationalUnit = this.operationalUnits[0].id;
    this.user = "Usuário";
  }

  logout() {
    console.log("Logout");
  }

  confirmCancel() {
    console.log("Cancel");
  }

  openHelp() {
    window.open(this.helpLink, "_blank");
  }
}
