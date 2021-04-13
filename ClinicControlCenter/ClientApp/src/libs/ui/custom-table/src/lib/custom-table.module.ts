import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UiMaterialModule } from "src/libs/ui/material/src";
import { CustomTableComponent } from "./custom-table.component";

@NgModule({
  imports: [
    CommonModule,
    UiMaterialModule,
    FormsModule,
  ],
  declarations: [CustomTableComponent],
  exports: [CustomTableComponent],
})
export class CustomTableModule {}
