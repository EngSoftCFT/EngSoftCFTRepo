import { UiMaterialModule } from "./../libs/ui/material/src/lib/ui-material.module";
import { CommonModule } from "@angular/common";
import { FeaMenuModule } from "./../libs/ui/fea-menu/src/lib/fea-menu.module";
import { FeaHeaderModule } from "./../libs/ui/fea-header/src/lib/fea-header.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./old/nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./old/counter/counter.component";
import { FetchDataComponent } from "./old/fetch-data/fetch-data.component";
import { ApiAuthorizationModule } from "src/api-authorization/api-authorization.module";
import { AuthorizeInterceptor } from "src/api-authorization/authorize.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { ClinicPicturesComponent } from "./clinic-pictures/clinic-pictures.component";
import { UserManagementComponent } from "./system-management/user-management/user-management.component";
import { CustomTableModule } from "src/libs/ui/custom-table/src";
import { AdressDatabaseComponent } from "./adress-database/adress-database.component";
import { PatientsComponent } from "./system-management/patients/patients.component";
import { NewAppointmentComponent } from "./appointments/new-appointment/new-appointment.component";
import { ListAppointmentsComponent } from "./appointments/list-appointments/list-appointments.component";
import { CustomSearchBarModule } from "src/libs/ui/custom-search-bar/src";
import { UserModalComponent } from './system-management/components/user-modal/user-modal.component';
import { AddressTableComponent } from './address-table/address-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ClinicPicturesComponent,
    UserManagementComponent,
    AdressDatabaseComponent,
    PatientsComponent,
    NewAppointmentComponent,
    ListAppointmentsComponent,
    UserModalComponent,
    AddressTableComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    AppRoutingModule,
    UiMaterialModule,
    BrowserAnimationsModule,
    FeaHeaderModule,
    FeaMenuModule,
    CustomTableModule,
    CustomSearchBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
