import { ModuleWithProviders,NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HubComponent} from './hubs/hub.component';
import {BikeComponent} from './bikes/bike.component';
import {FacilityComponent} from './facilities/facility.component';

const appRoutes: Routes = [
  {     path: '',
    redirectTo: '/parking',
    pathMatch: 'full'},
  { path: 'parking', component: FacilityComponent },
  { path: 'bike', component: BikeComponent },
];

//export const appRoutingProviders: any[] = [];
//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class appRoutingProviders { }

export const routing = [AppComponent, FacilityComponent, BikeComponent];