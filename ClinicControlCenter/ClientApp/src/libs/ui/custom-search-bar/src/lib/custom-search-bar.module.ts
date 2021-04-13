import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UiMaterialModule } from "src/libs/ui/material/src";
import { CustomSearchBarComponent } from "./custom-search-bar.component";

@NgModule({
  imports: [CommonModule, UiMaterialModule, FormsModule],
  declarations: [CustomSearchBarComponent],
  exports: [CustomSearchBarComponent],
})
export class CustomSearchBarModule {}
