import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BikeService } from './bikes/bike.service';
import { LeftNavigation } from './component/left.navigation.component';
import { BottomNavigation } from './component/bottom.navigation.component';
import { BlackOverlay } from './component/blackoverlay.component';


import {HubComponent} from './hubs/hub.component';
import { AppComponent }  from './app.component';
import { BikeComponent }  from './bikes/bike.component';

import { HttpModule }    from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {MapComponent} from './map/map.component';
import {FacilityComponent} from './facilities/facility.component'
import { FormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing, appRoutingProviders }  from './app.routing';

@NgModule({
    imports: [ BrowserModule,
    HttpModule,FormsModule,
    Ng2BootstrapModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyC9xg4iGS-l2PLDIdLp1u3T9vCIMXIdVoE'
    }),
    appRoutingProviders],
    declarations: [ AppComponent,
    HubComponent,
    MapComponent,
    BikeComponent,
    FacilityComponent,
    LeftNavigation,
    BottomNavigation,
    BlackOverlay,routing],
    //providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
