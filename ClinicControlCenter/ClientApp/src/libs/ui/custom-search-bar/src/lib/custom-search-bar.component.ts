import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { isNullOrUndefined } from "src/libs/util/utils/src";
import {
  CustomSearchBarDefinition,
  FieldType,
  SearchField,
} from "./models/custom-search-bar.model";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "custom-search-bar",
  templateUrl: "./custom-search-bar.component.html",
  styleUrls: ["./custom-search-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSearchBarComponent implements OnInit {
  @Input() definition: CustomSearchBarDefinition;
  @Input() filter: object;
  @Output() filterChange = new EventEmitter<object>();
  @Output() instance: CustomSearchBarComponent;
  @Output() searchEvent = new EventEmitter<object>();
  @Output() clearEvent = new EventEmitter<object>();
  @Output() addEvent = new EventEmitter<object>();

  get filterObj(): object {
    return this.filter;
  }

  set filterObj(obj: object) {
    this.filter = obj;
    this.filterChange.emit(this.filter);
  }

  constructor() {
    this.instance = this;
  }

  ngOnInit(): void {
    if (!this.filterObj) this.filterObj = {};

    if (!this.definition.clearButtonTooltip)
      this.definition.clearButtonTooltip = "Clear";
    if (!this.definition.searchButtonTooltip)
      this.definition.searchButtonTooltip = "Search";
    if (!this.definition.addButtonTooltip)
      this.definition.addButtonTooltip = "Add";

    this.definition.fields.forEach((field) => {
      if (!field.type) field.type = FieldType.TEXT;
      if (!field.filterName) field.filterName = field.name;
      if (!field.filterValue) field.filterValue = (obj) => obj;
      if (!field.options) field.options = [];

      if (!field.optionsDisplayName)
        switch (field.type) {
          case FieldType.VALUE_RANGE:
            field.optionsDisplayName = null;
            break;
          default:
            field.optionsDisplayName = (obj) => obj?.toString() ?? "";
            break;
        }

      if (field.defaultValue && !this.filterObj[field.filterName]) {
        this.filterObj[field.filterName] = field.filterValue(
          field.defaultValue
        );
      }
    });
  }

  add() {
    this.addEvent.emit(this.filter);
  }

  clear() {
    this.setFilterToDefault(this.filter, this.definition.fields);
    this.clearEvent.emit(this.filter);
  }

  setFilterToDefault(filter: any, fields: SearchField[]) {
    fields.forEach((field) => {
      this.filterObj[field.filterName] = field.defaultValue ?? undefined;
    });
  }

  search() {
    this.searchEvent.emit(this.filter);
  }

  isTextField(field: SearchField) {
    return field.type === FieldType.TEXT;
  }

  isNumberField(field: SearchField) {
    return field.type === FieldType.NUMBER;
  }

  setNumberFieldFilter(value: number, field: SearchField) {
    if (!isNullOrUndefined(field.floor))
      value = value < field.floor ? field.floor : value;
    if (!isNullOrUndefined(field.ceil))
      value = value > field.ceil ? field.ceil : value;

    this.filterObj[field.filterName] = field.filterValue(value);
  }

  isSelectField(field: SearchField) {
    return field.type === FieldType.SELECT;
  }

  isMultSelectField(field: SearchField) {
    return field.type === FieldType.MULT_SELECT;
  }

  isDateRangeField(field: SearchField) {
    return field.type === FieldType.DATE_RANGE;
  }

  isValueRangeField(field: SearchField) {
    return field.type === FieldType.VALUE_RANGE;
  }
}
