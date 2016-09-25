import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BikeService } from './services/bike.service';

import { AppComponent }  from './app.component';
import { HttpModule }    from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
@NgModule({
  imports: [ BrowserModule,HttpModule ],
  declarations: [ AppComponent ],
  providers: [BikeService],
  bootstrap: [ AppComponent]
})
export class AppModule { }
