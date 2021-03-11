import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RealEstateVisitModal } from "../../models/real-estate-visit-modal";

@Component({
  templateUrl: "./new-real-estate-visit.component.html",
  styleUrls: ["./new-real-estate-visit.component.scss"],
})
export class NewRealEstateVisitComponent implements OnInit {
  constructor(
    private modalRef: MatDialogRef<NewRealEstateVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RealEstateVisitModal
  ) {
    data.realEstateVisit.realEstateId = data.realEstateId;
  }

  ngOnInit(): void {}

  close() {
    this.modalRef.close();
  }

  save() {
    this.modalRef.close(this.data.realEstateVisit);
  }
}
