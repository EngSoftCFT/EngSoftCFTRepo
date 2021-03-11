import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmationModalConfig } from "./models/confirmation-modal-config.model";

@Component({
  selector: "app-confrimation-modal",
  templateUrl: "./confrimation-modal.component.html",
  styleUrls: ["./confrimation-modal.component.scss"],
})
export class ConfrimationModalComponent implements OnInit {
  config: ConfirmationModalConfig;

  constructor(
    public dialogRef: MatDialogRef<ConfrimationModalComponent>,
    @Inject(MAT_DIALOG_DATA) config: ConfirmationModalConfig
  ) {
    this.config = config;
  }

  ngOnInit(): void {}

  onCancelClick() {
    this.dialogRef.close(false);
  }

  close() {
    this.dialogRef.close();
  }
  onConfirmClick() {
    this.dialogRef.close(true);
  }
}

