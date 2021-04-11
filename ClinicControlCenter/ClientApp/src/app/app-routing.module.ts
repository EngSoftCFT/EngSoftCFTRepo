import { NavMenuComponent } from './old/nav-menu/nav-menu.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { INamedRoutes } from "src/libs/ui/fea-menu/src";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";

import { CounterComponent } from './old/counter/counter.component';
import { FetchDataComponent } from './old/fetch-data/fetch-data.component';
import { HomeComponent as OldHome } from "./old/home/home.component";

import { HomeComponent } from "./home/home.component";
import { ClinicPicturesComponent } from './clinic-pictures/clinic-pictures.component';
import { UserManagementComponent } from './system-management/user-management/user-management.component';
import { AdressDatabaseComponent } from './adress-database/adress-database.component';
import { NewAppointmentComponent } from './appointments/new-appointment/new-appointment.component';
import { ListAppointmentsComponent } from './appointments/list-appointments/list-appointments.component';

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
    name: "Clinic Pictures",
    path: "clinic-pictures",
    component: ClinicPicturesComponent,
    icon: "photo_camera",
  },
  {
    name: "Appointments",
    path: "appointments",
    icon: "date_range",
    isGroupOnly: true,
    children: [
      {
        name: "New Appointment",
        path: "new-appointment",
        component: NewAppointmentComponent,
        icon: "pending_actions",
      },
      {
        name: "Appointment Listing",
        path: "lsit-appointments",
        component: ListAppointmentsComponent,
        icon: "calendar_view_month",
      },
    ],
  },
  {
    name: "System Management",
    path: "system-management",
    icon: "settings",
    isGroupOnly: true,
    children: [
      {
        name: "Users",
        path: "user-management",
        component: UserManagementComponent,
        icon: "psychology",
      },
    ],
  },
  {
    name: "Addresses",
    path: "addresses",
    component: AdressDatabaseComponent,
    icon: "contact_mail",
  },
  {
    name: "Old",
    path: "old",
    icon: "group",
    isGroupOnly: true,
    children: [
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
