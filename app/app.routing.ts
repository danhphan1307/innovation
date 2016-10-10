import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HubComponent} from './hubs/hub.component';
import {FacilityComponent} from './facilities/facility.component';
const appRoutes: Routes = [
  { path: 'bike', component: AppComponent },
  { path: 'facility', component: FacilityComponent },
  { path: '', component: AppComponent },

];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);