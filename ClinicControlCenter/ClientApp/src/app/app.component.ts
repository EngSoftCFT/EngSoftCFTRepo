import { Component } from '@angular/core';
import { INamedRoute } from 'src/libs/ui/fea-menu/src';
import { AssetLoaderService } from 'src/libs/util/asset-loader/src';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "app";

  currentRoute: INamedRoute | null | undefined;

  constructor(private assetLoader: AssetLoaderService) {
    // assetLoader.loadIcon("eye");
  }
}
