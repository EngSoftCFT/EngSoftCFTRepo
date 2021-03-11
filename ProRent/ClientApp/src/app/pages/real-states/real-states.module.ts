import { MaterialModule } from "./../../material-module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RealStatesRoutingModule } from "./real-states-routing.module";
import { RealstatesComponent } from "./realstates/realstates.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NewRealEstateComponent } from "./realstates/components/new-real-estate/new-real-estate.component";
import { FormsModule } from "@angular/forms";
import { RealEstateVisitsComponent } from "./real-estate-visits/real-estate-visits.component";
import { NewRealEstateVisitComponent } from "./components/new-real-estate-visit/new-real-estate-visit.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

@NgModule({
  declarations: [
    RealstatesComponent,
    NewRealEstateComponent,
    RealEstateVisitsComponent,
    NewRealEstateVisitComponent,
  ],
  imports: [
    CommonModule,
    RealStatesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  entryComponents: [NewRealEstateComponent, NewRealEstateVisitComponent],
})
export class RealStatesModule {}
