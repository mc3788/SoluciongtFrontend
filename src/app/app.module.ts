import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DataService } from './services/data.service';
import { CreaPdf } from './utils/crea-pdf';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeGt from '@angular/common/locales/es-GT';
import {PipesModule} from './containers/pipes/pipes.module';
import { GoogleChartsModule } from 'angular-google-charts';

registerLocaleData( localeGt, 'es-GT' );

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import {AlertModule} from 'ngx-bootstrap';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {NumerosALetras} from './utils/numeros-a-letras';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    HttpClientModule,
    PipesModule,
    GoogleChartsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, DataService, AuthService, AuthGuardService, CreaPdf, NumerosALetras, DatePipe],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
