import { Component, OnInit } from "@angular/core";
import { IAppointmentViewModel } from "src/libs/domain/models/appointment/AppointmentViewModel";
import {
  ColumnDefinition,
  CustomTableDefinition,
} from "src/libs/ui/custom-table/src";
import { BaseApiService } from "src/libs/util/base-api/src";
import { IPaginationFilter } from "src/libs/util/base-api/src/lib/models/PaginationFilter";
import { isNullOrUndefined } from "src/libs/util/utils/src";

@Component({
  templateUrl: "./list-appointments.component.html",
  styleUrls: ["./list-appointments.component.scss"],
})
export class ListAppointmentsComponent implements OnInit {
  tableDefinition: CustomTableDefinition = new CustomTableDefinition({
    columnDefinitions: [
      {
        name: "Doctor",
        allowSorting: true,
        getValueFunc: (element: IAppointmentViewModel) =>
          element?.User?.FullName ??
          `_${element?.User?.UserName}_` ??
          `_${element?.User?.Email}_`,
      },
      {
        name: "AppointmentTime",
        displayName: "Appointment Time",
        allowSorting: true,
        getValueFunc: (element: IAppointmentViewModel) => {
          if (isNullOrUndefined(element.Date)) return "-";
          return new Date(element.Date).toLocaleString();
        },
      },
      {
        name: "Patient",
        allowSorting: true,
        getValueFunc: (element: IAppointmentViewModel) => element.Name,
      },
      {
        name: "Specialty",
        allowSorting: true,
        getValueFunc: (element: IAppointmentViewModel) =>
          element?.Doctor?.Specialty,
      },
    ] as ColumnDefinition[],
    paginate: true,
    frontPaginateSort: true,
  });
  values: IAppointmentViewModel[] = [];

  apiFilter: IPaginationFilter = {
    Limit: 100000,
  };

  constructor(private api: BaseApiService) {
    api.setRequestPath("/api/Appointments");
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.api.getPaginated<IAppointmentViewModel>(this.apiFilter).subscribe(
      (data) => {
        this.values = data?.Items ?? [];
      },
      (error) => console.error(error)
    );
  }
}
