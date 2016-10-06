import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HubComponent} from './hubs/hub.component';

const appRoutes: Routes = [
  { path: 'bike', component: AppComponent },
  { path: 'hub', component: HubComponent },
  { path: '', component: AppComponent },

];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);