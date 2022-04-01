import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
import { NgxLiquidGaugeModule } from 'ngx-liquid-gauge';

import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {HomeComponent} from './dashboard.component';
import { AuthGuard } from './helper';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DataTablesModule,
    NgxLiquidGaugeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }