import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconSideBarComponent } from "./icon-side-bar/icon-side-bar.component";
import { ExpandableMenuComponent } from "./expandable-menu/expandable-menu.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiMaterialModule } from "src/libs/ui/material/src";
import { FeaMenuComponent } from "./fea-menu.component";
@NgModule({
  imports: [
    CommonModule,
    UiMaterialModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  declarations: [
    FeaMenuComponent,
    IconSideBarComponent,
    ExpandableMenuComponent,
  ],
  exports: [ FeaMenuComponent ],
})
export class FeaMenuModule {}
