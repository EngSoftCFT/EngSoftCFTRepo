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
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
})
export class PatientsComponent implements OnInit {
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
        name: "IsPatient",
        displayName: "Patient",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        icon: "done",
        showIcon: (element: IUserViewModel) => element.IsPatient,
      },
      {
        name: "Add",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "add",
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
          name: "Users to Show",
          type: FieldType.SELECT,
          filterName: "UserTypes",
          options: [null, USER_ROLES.PATIENT_ROLE],
          optionsDisplayName: (option: USER_ROLES | null) => {
            if (option === USER_ROLES.PATIENT_ROLE) return "Only Patients";
            return "All Users";
          },
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
        title: "Patient Details",
        enableEdition: false,
        showRoleSelect: false,
        showPatientSwitch: true,
        modalObj: UserRoleDTO.FromViewModel(element),
      }),
    });
  }

  update(element: IUserViewModel) {
    const modal = this.dialog.open(UserModalComponent, {
      data: new UserModal({
        title: "Update Patient",
        enableEdition: true,
        showRoleSelect: false,
        showPatientSwitch: true,
        modalObj: UserRoleDTO.FromViewModel(element),
      }),
    });

    modal.afterClosed().subscribe((modalObj) => {
      if (!isNullOrUndefined(modalObj)) this.updateUserRole(modalObj);
    });
  }

  updateUserRole(element: UserRoleDTO) {
    const roleUpdatePath: string = element.isPatient
      ? "/api/UserManagement/to-patient"
      : "/api/UserManagement/remove-patient";


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
