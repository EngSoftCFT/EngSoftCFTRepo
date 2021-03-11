import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-button-save",
  templateUrl: "./button-save.component.html",
  styleUrls: ["./button-save.component.scss"],
})
export class ButtonSaveComponent implements OnInit {
  public name: string;
  public shared: boolean;
  public modified: boolean = true;
  public hide: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: { name: string; shared?: boolean; isOwner: boolean },
    public dialogRef: MatDialogRef<ButtonSaveComponent>
  ) {}

  openDialog(): void {}

  modifiedEdition() {
    this.modified = !this.modified;
  }
  ngOnInit(): void {
    this.shared = this.input.shared != null ? this.input.shared : false;
    this.name = this.input.name != null ? this.input.name : null;
    this.hide = this.input.name == null || !this.input.isOwner ? true : false;
    if (this.hide) this.modified = false;
  }
  close() {
    this.dialogRef.close();
  }
}
