export class CustomSearchBarDefinition {
  fields: SearchField[];
  searchButtonHidden?: boolean;
  searchButtonTooltip?: string;
  clearButtonHidden?: boolean;
  clearButtonTooltip?: string;
  addButtonHidden?: boolean = true;
  addButtonTooltip?: string;

  constructor(obj: Partial<CustomSearchBarDefinition>) {
    for (const prop of Object.keys(obj)) {
      this[prop] = obj[prop];
    }
  }
}

export interface SearchField {
  name: string;
  defaultValue?: any;
  filterName?: string;
  filterValue?: (obj: any) => any;
  type?: FieldType;
  options?: any[];
  optionsDisplayName?: (obj: any) => any;
  floor?: number;
  ceil?: number;
  step?: number;
}

export const enum FieldType {
  TEXT = 0,
  NUMBER,
  SELECT,
  MULT_SELECT,
  TEXT_AUTO_COMPLETE,
  DATE_RANGE,
  VALUE_RANGE,
}
