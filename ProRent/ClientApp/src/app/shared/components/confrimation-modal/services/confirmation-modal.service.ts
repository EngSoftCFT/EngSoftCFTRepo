import { Injectable, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalConfig } from "../models/confirmation-modal-config.model";
import { Subject } from "rxjs";
import { ConfrimationModalComponent } from "../confrimation-modal.component";

@Injectable({
  providedIn: "root",
})
export class ConfirmationModalService {
  confirmationModalConfig: ConfirmationModalConfig;
  confirmationResult: Subject<boolean> = new Subject<boolean>();

  constructor(public confirmDialog: MatDialog) {}

  openConfirmationModal(config: ConfirmationModalConfig) {
    const dialogReference = this.confirmDialog.open(ConfrimationModalComponent, { data: config });
    dialogReference.afterClosed().subscribe((result) => this.onModalClose(result));
  }

  onModalClose(result: boolean) {
    this.confirmationResult.next(result);
  }
}
