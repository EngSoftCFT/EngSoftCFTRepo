import { CustomTableComponent } from "./components/custom-table/custom-table.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonSaveComponent } from "./components/button-save/button-save.component";
import { ButtonRunComponent } from "./components/button-run/button-run.component";
import { MaterialModule } from "../material-module";
import { FormsModule } from "@angular/forms";
import { ModalLoaderComponent } from "./components/modal-loader/modal-loader.component";
import { MatDialogRef } from "@angular/material/dialog";
import { ModalLoaderService } from "./components/modal-loader/services/modal-loader.service";
import { ConfirmationModalService } from "./components/confrimation-modal/services/confirmation-modal.service";
import { ConfrimationModalComponent } from "./components/confrimation-modal/confrimation-modal.component";
import { ModalAlignmentComponent } from "./components/modal-alignment/modal-alignment.component";
import { UnauthorizedPageComponent } from "./components/unauthorized-page/unauthorized-page.component";
import { CustomSearchBarComponent } from "./components/custom-search-bar/custom-search-bar.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Ng5SliderModule } from "ng5-slider";

@NgModule({
  declarations: [
    ButtonSaveComponent,
    ButtonRunComponent,
    ModalLoaderComponent,
    ConfrimationModalComponent,
    ModalAlignmentComponent,
    UnauthorizedPageComponent,
    CustomTableComponent,
    CustomSearchBarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
  ],
  exports: [
    ButtonSaveComponent,
    ButtonRunComponent,
    ModalLoaderComponent,
    ModalAlignmentComponent,
    ConfrimationModalComponent,
    UnauthorizedPageComponent,
    CustomTableComponent,
    CustomSearchBarComponent,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    ModalLoaderService,
    ConfirmationModalService,
  ],
  entryComponents: [ConfrimationModalComponent],
})
export class SharedModule {}
