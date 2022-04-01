// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { DataTablesModule } from "angular-datatables";
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxLiquidGaugeModule } from 'ngx-liquid-gauge';
import { NgApexchartsModule } from "ng-apexcharts";

// services
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// helpers
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './helper';

// pages
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AlertComponent } from './service/alert.comp';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgApexchartsModule,
    GoogleChartsModule,
    NgxLiquidGaugeModule,
    NgxMaskModule.forRoot(),
    RecaptchaModule.forRoot({
      siteKey: '6Lf3PAofAAAAAK7K63XN27jyxCHNo0Qj5Cma-PCz',
    }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }