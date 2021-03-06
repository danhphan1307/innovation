import { ModuleWithProviders,NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ParkZoneComponent} from './park-zone/parkzone.component';
import {BikeComponent} from './bikes/bike.component';
import {UserComponent} from './component/user.panel.component';
import {FacilityComponent} from './facilities/facility.component';

const appRoutes: Routes = [
  {     path: '',
    redirectTo: '/parking',
    pathMatch: 'full'},
  { path: 'parkandride', component: FacilityComponent },
  { path: 'bike', component: BikeComponent },
  { path: 'user', component: UserComponent },
  { path: 'parking',component: FacilityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class appRoutingProviders { }

export const routing = [AppComponent, FacilityComponent, BikeComponent, UserComponent,ParkZoneComponent];