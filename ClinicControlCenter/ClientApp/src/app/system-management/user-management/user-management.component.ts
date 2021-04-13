import { UserModal } from "./../models/UserModal";
import { UserModalComponent } from "./../components/user-modal/user-modal.component";
import { IPaginationFilter } from "./../../../libs/util/base-api/src/lib/models/PaginationFilter";
import { Component, OnInit } from "@angular/core";
import {
  ColumnDefinition,
  CustomTableDefinition,
} from "src/libs/ui/custom-table/src";
import { BaseApiService } from "src/libs/util/base-api/src";
import { IUserViewModel } from "../models/UserViewModel.model";
import {
  CustomSearchBarDefinition,
  FieldType,
} from "src/libs/ui/custom-search-bar/src";
import { USER_ROLES } from "src/libs/util/user-controller/src";
import { MatDialog } from "@angular/material/dialog";
import { UserRoleDTO } from "../models/UserRoleDTO";
import { isNullOrUndefined } from "src/libs/util/utils/src";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  tableDefinition: CustomTableDefinition = new CustomTableDefinition({
    columnDefinitions: [
      {
        name: "FullName",
        allowSorting: true,
        getValueFunc: (element: IUserViewModel) =>
          element.FullName ?? `_${element.UserName}_`,
      },
      {
        name: "Email",
        allowSorting: true,
      },
      {
        name: "CEP",
        displayName: "Endereço",
        allowSorting: true,
      },
      {
        name: "IsEmployee",
        displayName: "Employee",
        customHeaderClass: "column-extra-small",
        customCellClass: "column-extra-small",
        icon: "done",
        showIcon: (element: IUserViewModel) => element.IsEmployee,
      },
      {
        name: "IsDoctor",
        displayName: "Doctor",
        customHeaderClass: "column-extra-small",
        customCellClass: "column-extra-small",
        icon: "done",
        showIcon: (element: IUserViewModel) => element.IsDoctor,
      },
      {
        name: "IsManager",
        displayName: "Manager",
        customHeaderClass: "column-extra-small",
        customCellClass: "column-extra-small",
        icon: "done",
        showIcon: (element: IUserViewModel) => element.IsManager,
      },
      {
        name: "Edit",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "edit",
        onClick: (element: IUserViewModel) => {
          this.update(element);
        },
      },
      {
        name: "Details",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "eye",
        onClick: (element: IUserViewModel) => {
          this.details(element);
        },
      },
    ] as ColumnDefinition[],
    paginate: true,
    frontPaginateSort: true,
  });
  values: IUserViewModel[] = [];

  searchBarDefinition: CustomSearchBarDefinition = new CustomSearchBarDefinition(
    {
      fields: [
        { name: "Name", type: FieldType.TEXT },
        { name: "Email", type: FieldType.TEXT },
        {
          name: "User Role",
          type: FieldType.MULT_SELECT,
          filterName: "UserTypes",
          options: [
            null,
            USER_ROLES.MANAGER_ROLE,
            USER_ROLES.DOCTOR_ROLE,
            USER_ROLES.EMPLOYEE_ROLE,
          ],
          defaultValue: null,
        },
      ],
      addButtonHidden: true,
    }
  );

  apiFilter: IPaginationFilter = {
    Limit: 100000,
  };

  constructor(
    private api: BaseApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    api.setRequestPath("/api/UserManagement");
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.api.getPaginated<IUserViewModel>(this.apiFilter).subscribe(
      (data) => {
        this.values = data.Items;
      },
      (error) => console.error(error)
    );
  }

  details(element: IUserViewModel) {
    const modal = this.dialog.open(UserModalComponent, {
      data: new UserModal({
        title: "User Role Details",
        enableEdition: false,
        showRoleSelect: true,
        showPatientSwitch: false,
        modalObj: UserRoleDTO.FromViewModel(element),
      }),
    });
  }

  update(element: IUserViewModel) {
    const modal = this.dialog.open(UserModalComponent, {
      data: new UserModal({
        title: "Edit User Role",
        enableEdition: true,
        showRoleSelect: true,
        showPatientSwitch: false,
        modalObj: UserRoleDTO.FromViewModel(element),
      }),
    });

    modal.afterClosed().subscribe((modalObj) => {
      if (!isNullOrUndefined(modalObj)) this.updateUserRole(modalObj);
    });
  }

  updateUserRole(element: UserRoleDTO) {
    let roleUpdatePath: string = null;
    switch (element.userRole) {
      case USER_ROLES.MANAGER_ROLE:
        roleUpdatePath = "/api/UserManagement/to-manager";
        break;
      case USER_ROLES.DOCTOR_ROLE:
        roleUpdatePath = "/api/UserManagement/to-doctor";
        break;
      case USER_ROLES.EMPLOYEE_ROLE:
        roleUpdatePath = "/api/UserManagement/to-employee";
        break;
      case USER_ROLES.USER_ROLE:
        roleUpdatePath = "/api/UserManagement/to-user";
        break;
      default:
        console.error("Invalid User Role: " + element.userRole);
        break;
    }

    if (!isNullOrUndefined(roleUpdatePath))
      this.api.put(element.Id, element, roleUpdatePath).subscribe((result) => {
        this.snackBar.open("Roles Updated", "X", {
          duration: 500,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.refreshData();

      });
  }
}
