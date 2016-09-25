import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BikeService } from './bikes/bike.service';

import { AppComponent }  from './app.component';
import { HttpModule }    from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
    imports: [ BrowserModule,
    HttpModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyC9xg4iGS-l2PLDIdLp1u3T9vCIMXIdVoE'
    }) ],
    declarations: [ AppComponent ],
    providers: [BikeService],
    bootstrap: [ AppComponent]
})
export class AppModule { }
