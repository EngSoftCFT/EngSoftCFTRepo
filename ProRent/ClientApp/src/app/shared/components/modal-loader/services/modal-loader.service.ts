import { Injectable } from '@angular/core';
import { ModalLoaderComponent } from '../modal-loader.component';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ModalLoaderService {

  dialogRefOpen: any;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ModalLoaderComponent>) { }

  loadStart() {
    this.dialogRefOpen = this.dialog.open(ModalLoaderComponent, {
      disableClose: true,
      panelClass: "loader-modal-container"
    });
  }

  loadFinished() {
    this.dialogRefOpen.close();
  }

}
