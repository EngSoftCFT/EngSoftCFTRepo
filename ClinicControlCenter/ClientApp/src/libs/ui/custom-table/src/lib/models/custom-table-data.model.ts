import { CustomTableComponent } from './../custom-table.component';
export class CustomTableDefinition {
  columnDefinitions: ColumnDefinition[];
  displayedColumns?: string[];
  paginate?: boolean;
  pagination?: {
    length: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
  };
  frontPaginateSort?: boolean;

  constructor(obj: Partial<CustomTableDefinition>) {
    for (const prop of Object.keys(obj)) {
      this[prop] = obj[prop];
    }
  }
}

export interface ColumnDefinition {
  name: string;
  displayName?: string;
  getValueFunc?: (obj: any) => any;
  customCellClass?: string | string[] | object;
  customHeaderClass?: string | string[] | object;
  allowSorting?: boolean;
  isButton?: boolean;
  icon?: string;
  iconSvg?: string;
  showIcon?: (element?: any, columnDefinition?: ColumnDefinition, tableComponent?: CustomTableComponent) => boolean;
  iconValue?: (element?: any, columnDefinition?: ColumnDefinition, tableComponent?: CustomTableComponent) => string | undefined;
  iconSvgValue?: (element?: any, columnDefinition?: ColumnDefinition, tableComponent?: CustomTableComponent) => string | undefined;
  onClick?: (element?: any, columnDefinition?: ColumnDefinition, event?: MouseEvent, tableComponent?: CustomTableComponent) => void;
}
