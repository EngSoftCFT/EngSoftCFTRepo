import { ColumnDefinition } from './models/custom-table-data.model';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter,
  Output,
  AfterViewInit,
} from "@angular/core";
import { CustomTableDefinition } from "./models/custom-table-data.model";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "custom-table",
  templateUrl: "./custom-table.component.html",
  styleUrls: ["./custom-table.component.scss"],
})
export class CustomTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() tableDefinition: CustomTableDefinition;
  @Input() values: any[];
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() instance: CustomTableComponent;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
    this.instance = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.values) {
      this.dataSource.data = this.values;
    }
  }

  ngOnInit() {
    if (this.tableDefinition) {
      if (!this.tableDefinition.displayedColumns) {
        this.tableDefinition.displayedColumns = [];
        this.tableDefinition.columnDefinitions.forEach((column) =>
          this.tableDefinition.displayedColumns.push(column.name)
        );
      }
      if (!this.tableDefinition.pagination) {
        this.tableDefinition.pagination = {
          length: this.dataSource.data?.length,
          pageIndex: 0,
          pageSize: 10,
          pageSizeOptions: [5, 10, 25, 50, 100],
        };
      }
      this.tableDefinition.columnDefinitions.forEach((column) => {
        if (!column.displayName) column.displayName = column.name;

        if (!column.getValueFunc) {
          if (column.icon || column.iconSvg) column.getValueFunc = (obj: any) => "";
          else column.getValueFunc = (obj: any) => obj[column.name];
        }
      });
    }
  }

  ngAfterViewInit() {
    if (this.tableDefinition.frontPaginateSort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
    this.RefreshTable();
  }

  onSort(event: Sort) {
    this.sortChange.emit(event);
    this.RefreshTable();
  }

  public RefreshTable(): void {
    this.table.renderRows();
  }
}
