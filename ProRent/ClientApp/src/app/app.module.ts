import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material-module";
import { SharedModule } from "./shared/shared.module";
import { MenuComponent } from "./components/menu/menu.component";
import { IconSideBarComponent } from "./components/menu/icon-side-bar/icon-side-bar.component";
import { InnerMenuComponent } from "./components/menu/inner-menu/inner-menu.component";
import { HeaderComponent } from "./components/header/header.component";
import { HttpInterceptorService } from "./services/http-interceptor.service";
import { FormsModule } from "@angular/forms";
import { RealStatesModule } from './pages/real-states/real-states.module';
import { Ng5SliderModule } from "ng5-slider";

export const unprotectedResources: string[] = ["/assets"];

registerLocaleData(localePt, "pt");

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    IconSideBarComponent,
    InnerMenuComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    RealStatesModule,
    Ng5SliderModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
