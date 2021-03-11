import { RealEstateVisistDTO } from "./../../../shared/models/RealEstateVisits/real-estate-visist-dto.model";
import { NewRealEstateVisitComponent } from "./../components/new-real-estate-visit/new-real-estate-visit.component";
import { isNullOrUndefined } from "src/app/shared/Functions/value-checks";
import { RealEstateDTO } from "src/app/shared/models/RealEstate/real-estate-dto.model";
import { RealEstateModal } from "./models/real-estate-modal";
import { NewRealEstateComponent } from "./components/new-real-estate/new-real-estate.component";
import { RealEstateFilter } from "./../../../shared/models/RealEstate/real-estate-filter";
import { Component, OnInit } from "@angular/core";
import {
  CustomSearchBarDefinition,
  FieldType,
} from "src/app/shared/components/custom-search-bar/models/custom-search-bar.model";
import {
  CustomTableDefinition,
  ColumnDefinition,
} from "src/app/shared/components/custom-table/models/custom-table-data.model";
import { RealEstateType, RealEstateTypeToString } from "src/app/shared/enums/real-estate-type.enum";
import { IRealEstateViewModel } from "src/app/shared/models/RealEstate/real-estate-viewmodel.model";
import { BaseApiService } from "src/app/services/base-api.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalService } from "src/app/shared/components/confrimation-modal/services/confirmation-modal.service";
import { RealEstateVisitModal } from "../models/real-estate-visit-modal";

@Component({
  templateUrl: "./realstates.component.html",
  styleUrls: ["./realstates.component.scss"],
})
export class RealstatesComponent implements OnInit {
  tableDefinition: CustomTableDefinition = new CustomTableDefinition({
    columnDefinitions: [
      {
        name: "type",
        displayName: "Tipo",
        allowSorting: true,
        getValueFunc: (realEstate: IRealEstateViewModel) => {
          return RealEstateTypeToString(RealEstateType[realEstate.type]);
        },
      },
      {
        name: "name",
        displayName: "Nome",
        allowSorting: true,
      },
      {
        name: "address",
        displayName: "Endereço",
        allowSorting: true,
      },
      {
        name: "area",
        displayName: "Area",
        allowSorting: true,
      },
      {
        name: "rentValue",
        displayName: "Aluguel",
        allowSorting: true,
      },
      {
        name: "bedRoomQt",
        displayName: "Quartos",
        allowSorting: true,
      },
      {
        name: "suiteQt",
        displayName: "Suites",
        allowSorting: true,
      },
      {
        name: "garageParkingSpace",
        displayName: "Garagem",
        allowSorting: true,
      },
      {
        name: "Adicionar Visita",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "add",
        onClick: (element: IRealEstateViewModel) => {
          this.addVisit(element.id);
        },
      },
      {
        name: "Detalhes",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "eye",
        onClick: (element: IRealEstateViewModel) => {
          this.details(element.id);
        },
      },
      {
        name: "Editar",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "edit",
        onClick: (element: IRealEstateViewModel) => {
          this.update(element.id);
        },
      },
      {
        name: "Excluir",
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "delete",
        onClick: (element: IRealEstateViewModel) => {
          this.delete(element.id);
        },
      },
    ] as ColumnDefinition[],
    paginate: true,
    frontPaginateSort: true,
  });
  values: IRealEstateViewModel[] = [];

  searchBarDefinition: CustomSearchBarDefinition = new CustomSearchBarDefinition({
    fields: [
      {
        name: "Tipo",
        type: FieldType.SELECT,
        filterName: "type",
        options: [null, RealEstateType.HOUSE, RealEstateType.APARTMENT],
        defaultValue: null,
        optionsDisplayName: (type: RealEstateType) => {
          switch (type) {
            case RealEstateType.HOUSE:
              return "Casas";
            case RealEstateType.APARTMENT:
              return "Apartamentos";
            default:
              return "Todos";
          }
        },
      },
      { name: "Nome", type: FieldType.TEXT, filterName: "name" },
      {
        name: "Area Minima",
        type: FieldType.NUMBER,
        filterName: "minArea",
        floor: 0,
      },
      {
        name: "Aluguel Maximo",
        type: FieldType.NUMBER,
        filterName: "maxRent",
        floor: 0,
      },
      { name: "Endereço", type: FieldType.TEXT, filterName: "address " },
    ],
    addButtonHidden: false,
  });
  searchBarFilter: RealEstateFilter = {};

  constructor(
    private api: BaseApiService,
    private dialog: MatDialog,
    private confirmationModal: ConfirmationModalService
  ) {
    api.urlPath = "/api/realestate";
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.api.getFiltered<IRealEstateViewModel>(this.searchBarFilter).subscribe(
      (data) => {
        this.values = data;
      },
      (error) => console.error(error)
    );
  }

  details(id: number) {
    this.api.get<RealEstateDTO>(id).subscribe((result) => {
      const modal = this.dialog.open(NewRealEstateComponent, {
        data: new RealEstateModal({
          title: "Detalhes do Imovel",
          disableEdition: true,
          realEstate: result,
        }),
      });
    });
  }

  add(filter?: RealEstateFilter) {
    const modal = this.dialog.open(NewRealEstateComponent, {
      data: new RealEstateModal({
        title: "Novo Registro de Imovel",
        filter,
      }),
    });
    modal.afterClosed().subscribe((realEstate) => {
      if (!isNullOrUndefined(realEstate)) this.saveNewRealEstate(realEstate);
    });
  }

  update(id: number) {
    this.api.get<RealEstateDTO>(id).subscribe((result) => {
      const modal = this.dialog.open(NewRealEstateComponent, {
        data: new RealEstateModal({
          title: "Atualizar Imovel",
          realEstate: result,
        }),
      });
      modal.afterClosed().subscribe((realEstate) => {
        if (!isNullOrUndefined(realEstate)) this.updateRealEstate(id, realEstate);
      });
    });
  }

  delete(id: number) {
    // TODO: Remake all this confirmation modal mess
    this.confirmationModal.openConfirmationModal({
      title: "Confirmar Exclusão",
      description: "Tem certeza que deseja excluir?",
    });
    const subs = this.confirmationModal.confirmationResult.subscribe((result) => {
      if (result) this.deleteRealEstate(id);
      subs.unsubscribe();
    });
  }

  addVisit(realEstateId: number) {
    const modal = this.dialog.open(NewRealEstateVisitComponent, {
      data: new RealEstateVisitModal({
        title: "Novo Visita",
        realEstateId,
      }),
    });
    modal.afterClosed().subscribe((realEstateVisit) => {
      if (!isNullOrUndefined(realEstateVisit)) this.saveNewRealEstateVisit(realEstateVisit);
    });
  }

  private saveNewRealEstateVisit(realEstateVisit: RealEstateVisistDTO) {
    this.api.post(realEstateVisit,"/api/visit").subscribe((result) => {});
  }

  private saveNewRealEstate(realEstate: RealEstateDTO) {
    this.api.post(realEstate).subscribe((result) => {
      this.refreshData();
    });
  }

  private updateRealEstate(id: number, realEstate: RealEstateDTO) {
    this.api.put(id, realEstate).subscribe((result) => {
      this.refreshData();
    });
  }

  private deleteRealEstate(id: number) {
    this.api.delete(id).subscribe((result) => {
      this.refreshData();
    });
  }
}
