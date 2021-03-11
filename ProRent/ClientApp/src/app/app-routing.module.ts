import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UnauthorizedPageComponent } from "./shared/components/unauthorized-page/unauthorized-page.component";
import { RealStatesRoutes } from './pages/real-states/real-states-routing.module';

const routes: Routes = [
  { path: "", redirectTo: "realEstates/register", pathMatch: "full" },
  { path: "redirect", redirectTo: "", pathMatch: "full" },
  { path: "unauthorized", component: UnauthorizedPageComponent },
  ...RealStatesRoutes.routes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
