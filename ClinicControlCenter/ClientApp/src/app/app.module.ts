import { UiMaterialModule } from './../libs/ui/material/src/lib/ui-material.module';
import { CommonModule } from '@angular/common';
import { FeaMenuModule } from './../libs/ui/fea-menu/src/lib/fea-menu.module';
import { FeaHeaderModule } from './../libs/ui/fea-header/src/lib/fea-header.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './old/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './old/counter/counter.component';
import { FetchDataComponent } from './old/fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ClinicPicturesComponent } from './clinic-pictures/clinic-pictures.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ClinicPicturesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    AppRoutingModule,
    UiMaterialModule,
    BrowserAnimationsModule,
    FeaHeaderModule,
    FeaMenuModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
