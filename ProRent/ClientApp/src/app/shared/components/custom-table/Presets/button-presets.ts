import { Languages } from "../../../languagesTranslation";
import { CustomTableComponent } from "../custom-table.component";
import { ColumnDefinition } from "../models/custom-table-data.model";

export class ButtonPresets {
  public static languageCode = "default";

  private static get translation() {
    return Languages.getTranslation(this.languageCode);
  }

  public static getBasicCrudButtons<T>(
    detailAction?: (
      element: T,
      columnDefinition?: ColumnDefinition,
      event?: MouseEvent,
      tableComponent?: CustomTableComponent
    ) => void,
    editAction?: (
      element: T,
      columnDefinition?: ColumnDefinition,
      event?: MouseEvent,
      tableComponent?: CustomTableComponent
    ) => void,
    deleteAction?: (
      element: T,
      columnDefinition?: ColumnDefinition,
      event?: MouseEvent,
      tableComponent?: CustomTableComponent
    ) => void
  ) {
    if (!detailAction)
      detailAction = (element) => {
        console.log("Detail", element);
      };

    if (!editAction)
      editAction = (element) => {
        console.log("Edit", element);
      };

    if (!deleteAction)
      deleteAction = (element) => {
        console.log("Delete", element);
      };

    return [
      {
        name: ButtonPresets.translation.basicCrud.detail,
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "eye",
        onClick: detailAction,
      },
      {
        name: ButtonPresets.translation.basicCrud.edit,
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "edit",
        onClick: editAction,
      },
      {
        name: ButtonPresets.translation.basicCrud.delete,
        customHeaderClass: "column-small",
        customCellClass: "column-small",
        isButton: true,
        iconSvg: "delete",
        onClick: deleteAction,
      },
    ];
  }
}
