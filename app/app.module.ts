import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BikeService } from './bikes/bike.service';
import { FilterPanel } from './component/filter.panel';
import { BottomNavigation } from './component/bottom.navigation.component';
import { BlackOverlay } from './component/blackoverlay.component';
import { UserComponent }  from './component/user.panel.component';
import { ModalComponent }  from './component/modal.component';
import { CustomComponent }  from './component/custom.component';
import { Help} from './component/help.component';
import { CarouselComponent } from './component/instruction.component';
import { AppComponent }  from './app.component';
import { BikeComponent }  from './bikes/bike.component';
import { HttpModule }    from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {MapComponent} from './map/map.component';
import { MapService } from './map/map.service';
import { FacilityService } from './facilities/facility.service';
import {ParkZoneComponent} from './park-zone/parkzone.component'
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
    ParkZoneComponent,
    MapComponent,
    BikeComponent,
    UserComponent,
    FacilityComponent,
    FilterPanel,
    BottomNavigation,
    BlackOverlay,routing, Help,ModalComponent, CustomComponent, CarouselComponent],
    providers:[ FacilityService,
    MapService,BikeService],
    bootstrap: [AppComponent]
})
export class AppModule { }
