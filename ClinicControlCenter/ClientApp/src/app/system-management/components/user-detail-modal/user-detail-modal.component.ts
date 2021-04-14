import { UserModal } from '../../models/UserModal';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDetailModal } from '../../models/UserDetailModal';

@Component({
  templateUrl: "./user-detail-modal.component.html",
  styleUrls: ["./user-detail-modal.component.scss"],
})
export class UserDetailModalComponent implements OnInit {
  get modalObj() {
    return this.data.modalObj;
  }

  get title() {
    return this.data.title;
  }

  get enableEdition() {
    return this.data.enableEdition;
  }

  constructor(
    private modalRef: MatDialogRef<UserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailModal
  ) {}

  ngOnInit(): void {}

  close() {
    this.modalRef.close();
  }

  confirm() {
    this.modalRef.close(this.modalObj);
  }
}
