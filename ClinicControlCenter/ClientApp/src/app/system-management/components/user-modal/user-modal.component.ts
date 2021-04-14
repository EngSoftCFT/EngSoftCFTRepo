import { UserModal } from './../../models/UserModal';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { USER_ROLES } from 'src/libs/util/user-controller/src';

@Component({
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.scss"],
})
export class UserModalComponent implements OnInit {
  get showEmployeeProperties() {
    if (this.data?.showRoleSelect)
      return (
        this.data?.modalObj?.userRole === USER_ROLES.MANAGER_ROLE ||
        this.data?.modalObj?.userRole === USER_ROLES.DOCTOR_ROLE ||
        this.data?.modalObj?.userRole === USER_ROLES.EMPLOYEE_ROLE
      );
    return false;
  }

  get showDoctorProperties() {
    if (this.data?.showRoleSelect)
      return (
        this.data?.modalObj?.userRole === USER_ROLES.DOCTOR_ROLE
      );
    return false;
  }

  get showPatientProperties() {
    return this.data?.showPatientSwitch;
  }

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
    private modalRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModal
  ) {}

  ngOnInit(): void {}

  close() {
    this.modalRef.close();
  }

  confirm() {
    this.modalRef.close(this.modalObj);
  }

  getUserRoles() {
    return [
      USER_ROLES.MANAGER_ROLE,
      USER_ROLES.DOCTOR_ROLE,
      USER_ROLES.EMPLOYEE_ROLE,
      USER_ROLES.USER_ROLE,
    ];
  }

  setIsPatient(value: boolean) {
    this.modalObj.isPatient = value;
  }
}
