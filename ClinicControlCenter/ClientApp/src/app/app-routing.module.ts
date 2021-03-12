import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NamedRoute, INamedRoutes } from "src/libs/ui/fea-menu/src";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";

import { CounterComponent } from "src/app-old-with-auth/counter/counter.component";
import { FetchDataComponent } from "src/app-old-with-auth/fetch-data/fetch-data.component";
import { HomeComponent as OldHome } from "src/app-old-with-auth/home/home.component";

import { HomeComponent } from "./home/home.component";

// const routes: NamedRoutes = [
//   new NamedRoute({
//     path: "",
//     redirectTo: "Home",
//     pathMatch: "full",
//     isDisabled: true,
//   }),
//   new NamedRoute({
//     name: "Home",
//     path: "home",
//     component: HomeComponent,
//     icon: "home",
//   }),
//   new NamedRoute({
//     name: "Old Home",
//     path: "old-home",
//     component: OldHome,
//     icon: "home",
//   }),
//   new NamedRoute({
//     name: "Exemplos",
//     path: "examples",
//     icon: "group",
//     isGroupOnly: true,
//     children: [
//       new NamedRoute({
//         name: "Contador",
//         path: "counter",
//         icon: "counter",
//         component: CounterComponent,
//       }),
//       new NamedRoute({
//         name: "Busca dados",
//         path: "fetch-data",
//         icon: "fetch",
//         component: FetchDataComponent,
//         canActivate: [AuthorizeGuard],
//       }),
//     ],
//   }),
// ];

const routes: INamedRoutes = [
  {
    path: "",
    redirectTo: "Home",
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
    name: "Exemplos",
    path: "examples",
    icon: "group",
    isGroupOnly: true,
    children: [
     {
        name: "Contador",
        path: "counter",
        icon: "counter",
        component: CounterComponent,
      },
      {
        name: "Busca dados",
        path: "fetch-data",
        icon: "fetch",
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
