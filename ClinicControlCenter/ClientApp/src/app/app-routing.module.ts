import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { INamedRoutes } from "src/libs/ui/fea-menu/src";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { HomeComponent as OldHome } from "src/app-old-with-auth/home/home.component";

import { HomeComponent } from "./home/home.component";
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

const routes: INamedRoutes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
    isDisabled: true,
  },
  {
    name: "Home",
    path: "home",
    component: HomeComponent,
    icon: "home",
  },
  {
    name: "Old Home",
    path: "old-home",
    component: OldHome,
    icon: "home",
  },
  {
    name: "Old NavBar",
    path: "old-navbar",
    component: NavMenuComponent,
    icon: "air-horn",
  },
  {
    name: "Exemplos",
    path: "examples",
    icon: "group",
    isGroupOnly: true,
    children: [
      {
        name: "Contador",
        path: "counter",
        icon: "alarm",
        component: CounterComponent,
      },
      {
        name: "Busca dados",
        path: "fetch-data",
        icon: "android",
        component: FetchDataComponent,
        canActivate: [AuthorizeGuard],
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
