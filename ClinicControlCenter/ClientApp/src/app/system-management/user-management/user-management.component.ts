import { IPaginationFilter } from "./../../../libs/util/base-api/src/lib/models/PaginationFilter";
import { Component, OnInit } from "@angular/core";
import {
  ColumnDefinition,
  CustomTableDefinition,
} from "src/libs/ui/custom-table/src";
import { BaseApiService } from "src/libs/util/base-api/src";
import { IUserViewModel } from "../models/UserViewModel.model";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import {
  CustomSearchBarDefinition,
  FieldType,
} from "src/libs/ui/custom-search-bar/src";
import { USER_ROLES } from "src/libs/util/user-controller/src";

@Component({
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  tableDefinition: CustomTableDefinition = new CustomTableDefinition({
    columnDefinitions: [
      {
        name: "UserName",
        allowSorting: true,
      },
      {
        name: "FullName",
        allowSorting: true,
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
        name: "Telephone",
        displayName: "Endereço",
        allowSorting: true,
      },
      {
        name: "Editar",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "edit",
        onClick: (element: IUserViewModel) => {},
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
            USER_ROLES.ADMIN_ROLE,
            USER_ROLES.MANAGER_ROLE,
            USER_ROLES.DOCTOR_ROLE,
            USER_ROLES.EMPLOYEE_ROLE,
            USER_ROLES.PATIENT_ROLE,
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

  constructor(private api: BaseApiService) {
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

  details(id: number) {
    // this.api.get<RealEstateDTO>(id).subscribe((result) => {
    //   const modal = this.dialog.open(NewRealEstateComponent, {
    //     data: new RealEstateModal({
    //       title: "Detalhes do Imovel",
    //       disableEdition: true,
    //       realEstate: result,
    //     }),
    //   });
    // });
  }

  update(id: number) {
    // this.api.get<RealEstateDTO>(id).subscribe((result) => {
    //   const modal = this.dialog.open(NewRealEstateComponent, {
    //     data: new RealEstateModal({
    //       title: "Atualizar Imovel",
    //       realEstate: result,
    //     }),
    //   });
    //   modal.afterClosed().subscribe((realEstate) => {
    //     if (!isNullOrUndefined(realEstate))
    //       this.updateRealEstate(id, realEstate);
    //   });
    // });
  }
}
