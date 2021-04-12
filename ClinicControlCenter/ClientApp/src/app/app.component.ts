import { Component } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { INamedRoute } from "src/libs/ui/fea-menu/src";
import { AssetLoaderService } from "src/libs/util/asset-loader/src";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "app";

  currentRoute: INamedRoute | null | undefined;

  constructor(
    private assetLoader: AssetLoaderService,
    private dateAdapter: DateAdapter<Date>
  ) {
    assetLoader.loadIcon("delete");
    assetLoader.loadIcon("edit");
    assetLoader.loadIcon("eraser");
    assetLoader.loadIcon("eye");

    this.dateAdapter.setLocale(navigator.language);
  }
}
