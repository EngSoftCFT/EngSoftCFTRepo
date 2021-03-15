import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UiMaterialModule } from "src/libs/ui/material/src";
import { FeaHeaderComponent } from "./fea-header.component";
import { ApiAuthorizationModule } from "src/api-authorization/api-authorization.module";

@NgModule({
  imports: [
    CommonModule,
    UiMaterialModule,
    RouterModule,
    FormsModule,
    ApiAuthorizationModule,
  ],
  declarations: [FeaHeaderComponent],
  exports: [FeaHeaderComponent],
})
export class FeaHeaderModule {}
