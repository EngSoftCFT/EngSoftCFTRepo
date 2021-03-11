import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CompleteRoutes, CompleteRoutesName } from "src/app/shared/extensions/CompleteRoutes";
import { RealEstateVisitsComponent } from "./real-estate-visits/real-estate-visits.component";
import { RealstatesComponent } from "./realstates/realstates.component";

const routes: CompleteRoutes = [
  {
    path: "realEstates/register",
    component: RealstatesComponent,
    icon: "assignment",
    name: "Registro",
  },
  {
    path: "realEstates/visits",
    component: RealEstateVisitsComponent,
    icon: "assignment_ind",
    name: "Visitas",
  },
];

export const RealStatesRoutes: CompleteRoutesName = {
  routes,
  name: "Aluguel",
  icon: "house",
  isSelected: true,
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealStatesRoutingModule {}
