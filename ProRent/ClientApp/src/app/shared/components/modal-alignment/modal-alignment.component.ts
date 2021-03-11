import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "moment";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-modal-alignment",
  templateUrl: "./modal-alignment.component.html",
  styleUrls: ["./modal-alignment.component.scss"],
})
export class ModalAlignmentComponent implements OnInit {
  variableList = new Array();
  data: any;
  dateDisplacement: any;
  columnNames: string[] = ["Variável", "Período Inicial", "Período Final", "Delete"];
  displayedColumns: string[] = this.columnNames;
  dateRange = [new Date(), new Date()];
  dataSource = [];
  hideXaxis: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ModalAlignmentComponent>,
    protected toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public input: any
  ) {
    this.data = input.alignmentList;
    this.dateRange[0] = new Date(input.startDate);
    this.dateRange[1] = new Date(input.endDate);
    this.dataSource = input.table;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  selectVariable(variable) {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].selected = false;
    }
    variable.selected = true;
  }

  defineDisplacement() {
    let selected = this.data.filter((d) => d.selected);
    if (selected.length == 0) {
      this.toast.toastrError({ code: "FE2501" }, "X");
      return;
    }
    if (
      this.dateDisplacement == null ||
      this.dateDisplacement == undefined ||
      this.dateDisplacement == ""
    ) {
      this.toast.toastrError({ code: "FE2504" }, "X");
      return;
    }
    let operator = this.dateDisplacement.substr(0, 1);
    let shiftLetter = this.dateDisplacement.substr(-1, 1);
    let varshiftValue = this.dateDisplacement.slice(1, -1);
    if (operator == "-") {
      var newStartDate = moment(this.dateRange[0].toISOString())
        .subtract(varshiftValue, shiftLetter)
        .toDate();
      var newEndDate = moment(this.dateRange[1].toISOString())
        .subtract(varshiftValue, shiftLetter)
        .toDate();
    } else if (operator == "+") {
      var newStartDate = moment(this.dateRange[0].toISOString())
        .add(varshiftValue, shiftLetter)
        .toDate();
      var newEndDate = moment(this.dateRange[1].toISOString())
        .add(varshiftValue, shiftLetter)
        .toDate();
    } else {
      this.toast.toastrError({ code: "FE2503" }, "X");
    }

    let newLine = JSON.parse(JSON.stringify(selected));
    newLine[0].name += " (" + this.dateDisplacement + ")";
    newLine[0].startDate = moment(newStartDate).format("DD/MM/YYYY HH:mm");
    newLine[0].endDate = moment(newEndDate).format("DD/MM/YYYY HH:mm");
    newLine[0].displacementRef = this.dateDisplacement;

    let validation = this.dataSource.filter(
      (d) =>
        d.refId == newLine[0].refId &&
        d.startDate == newLine[0].startDate &&
        d.endDate == newLine[0].endDate
    );
    if (validation.length > 0) {
      this.toast.toastrError({ code: "FE2502" }, "X");
      return;
    }
    this.dataSource.push(newLine[0]);
    this.dataSource = [...this.dataSource];
  }

  sendDisplacement() {
    this.dialogRef.close({ data: this.dataSource, hideXaxis: this.hideXaxis });
  }

  removeDisplacement(element) {
    let index = this.dataSource.indexOf(element);
    this.dataSource.splice(index, 1);
    this.dataSource = [...this.dataSource];
  }
}
