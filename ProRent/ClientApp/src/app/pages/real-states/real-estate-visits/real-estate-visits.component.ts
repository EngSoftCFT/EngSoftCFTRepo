import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BaseApiService } from "src/app/services/base-api.service";
import { ConfirmationModalService } from "src/app/shared/components/confrimation-modal/services/confirmation-modal.service";
import {
  CustomSearchBarDefinition,
  FieldType,
} from "src/app/shared/components/custom-search-bar/models/custom-search-bar.model";
import {
  CustomTableDefinition,
  ColumnDefinition,
} from "src/app/shared/components/custom-table/models/custom-table-data.model";
import { RealEstateTypeToString, RealEstateType } from "src/app/shared/enums/real-estate-type.enum";
import { isNullOrUndefined } from "src/app/shared/Functions/value-checks";
import { RealEstateDTO } from "src/app/shared/models/RealEstate/real-estate-dto.model";
import { RealEstateVisistDTO as RealEstateVisitDTO } from "src/app/shared/models/RealEstateVisits/real-estate-visist-dto.model";
import { IRealEstateVisitViewmodel } from "src/app/shared/models/RealEstateVisits/real-estate-visit-viewmodel.model";
import { RealEstateVisitsFilter } from "src/app/shared/models/RealEstateVisits/real-estate-visits-filter";
import { NewRealEstateVisitComponent } from "../components/new-real-estate-visit/new-real-estate-visit.component";
import { RealEstateVisitModal } from "../models/real-estate-visit-modal";

@Component({
  templateUrl: "./real-estate-visits.component.html",
  styleUrls: ["./real-estate-visits.component.scss"],
})
export class RealEstateVisitsComponent implements OnInit {
  tableDefinition: CustomTableDefinition = new CustomTableDefinition({
    columnDefinitions: [
      {
        name: "type",
        displayName: "Tipo",
        allowSorting: true,
        getValueFunc: (visit: IRealEstateVisitViewmodel) => {
          return RealEstateTypeToString(RealEstateType[visit.type]);
        },
      },
      // {
      //   name: "name",
      //   displayName: "Nome",
      //   allowSorting: true,
      // },
      // {
      //   name: "number",
      //   displayName: "Numero",
      //   allowSorting: true,
      // },
      // {
      //   name: "street",
      //   displayName: "Rua",
      //   allowSorting: true,
      // },
      // {
      //   name: "neighborhood",
      //   displayName: "Bairro",
      //   allowSorting: true,
      // },
      // {
      //   name: "area",
      //   displayName: "Area",
      //   allowSorting: true,
      // },
      // {
      //   name: "rentValue",
      //   displayName: "Alguel",
      //   allowSorting: true,
      // },
      // {
      //   name: "visitTime",
      //   displayName: "Data",
      //   allowSorting: true,
      //   getValueFunc: (visit: IRealEstateVisitViewmodel) => {
      //     return new Date(visit.visitTime).toLocaleString();
      //   },
      // },
      {
        name: "Detalhes",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "eye",
        onClick: (element: IRealEstateVisitViewmodel) => {
          // this.details(element.id);
        },
      },
      {
        name: "Editar",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "edit",
        onClick: (element: IRealEstateVisitViewmodel) => {
          // this.update(element.id);
        },
      },
      {
        name: "Excluir",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "delete",
        onClick: (element: IRealEstateVisitViewmodel) => {
          // this.delete(element.id);
        },
      },
    ] as ColumnDefinition[],
    paginate: true,
    frontPaginateSort: true,
  });
  values: IRealEstateVisitViewmodel[] = [];

  searchBarDefinition: CustomSearchBarDefinition = new CustomSearchBarDefinition({
    fields: [{ name: "Data da visita", type: FieldType.DATE_RANGE, filterName: "dateRange" }],
  addButtonHidden: false,
  });
  searchBarFilter: RealEstateVisitsFilter = new RealEstateVisitsFilter();

  constructor(
    private api: BaseApiService,
    private dialog: MatDialog,
    private confirmationModal: ConfirmationModalService
  ) {
    api.urlPath = "/api/visit";
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.api.getFiltered<IRealEstateVisitViewmodel>(this.searchBarFilter).subscribe(
      (data) => {
        console.log("here3", this.values);
        this.values = data;
      },
      (error) => console.error(error)
    );
  }

  // details(id: number) {
  //   this.api.get<RealEstateVisitDTO>(id).subscribe((result) => {
  //     const modal = this.dialog.open(NewRealEstateVisitComponent, {
  //       data: new RealEstateVisitModal({
  //         title: "Detalhes da visita",
  //         disableEdition: true,
  //         realEstateVisit: result,
  //         realEstateId: result.realEstateId,
  //       }),
  //     });
  //   });
  // }

  // update(id: number) {
  //   this.api.get<RealEstateVisitDTO>(id).subscribe((result) => {
  //     const modal = this.dialog.open(NewRealEstateVisitComponent, {
  //       data: new RealEstateVisitModal({
  //         title: "Atualizar Visita",
  //         realEstateVisit: result,
  //         realEstateId: result.realEstateId,
  //       }),
  //     });
  //     modal.afterClosed().subscribe((realEstateVisit) => {
  //       if (!isNullOrUndefined(realEstateVisit)) this.updateRealEstateVisit(id, realEstateVisit);
  //     });
  //   });
  // }

  // delete(id: number) {
  //   // TODO: Remake all this confirmation modal mess
  //   this.confirmationModal.openConfirmationModal({
  //     title: "Confirmar Exclusão",
  //     description: "Tem certeza que deseja excluir?",
  //   });
  //   const subs = this.confirmationModal.confirmationResult.subscribe((result) => {
  //     if (result) this.deleteRealEstateVisit(id);
  //     subs.unsubscribe();
  //   });
  // }

  // private updateRealEstateVisit(id: number, realEstateVisit: RealEstateVisitDTO) {
  //   this.api.put(id, realEstateVisit).subscribe((result) => {
  //     this.refreshData();
  //   });
  // }

  // private deleteRealEstateVisit(id: number) {
  //   this.api.delete(id).subscribe((result) => {
  //     this.refreshData();
  //   });
  // }
}
