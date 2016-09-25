import { Component, OnInit } from '@angular/core';

import { BikeService } from './bikes/bike.service';
import {BikeStation} from './bikes/bike';

import {AgmCoreModule} from 'angular2-google-maps/core';


@Component({
    selector: 'my-app',
    styles: [`
    .sebm-google-map-container {
        height: 900px;
    }
    `],
    template: `
    <h1>{{ title }}</h1>

    <!-- this creates a google map on the page with the given lat/lng from -->
    <!-- the component as the initial center of the map: -->

    <sebm-google-map [latitude]="lat" [longitude]="lon" [zoom]="zoom">
    <sebm-google-map-marker [latitude]="lat" [longitude]="lon"></sebm-google-map-marker>
    <sebm-google-map-marker *ngFor="let station of stations"
                [latitude]="station.y"
                [longitude]="station.x"
                 [label]="station.name"></sebm-google-map-marker>
    </sebm-google-map>

    `,
    providers: [BikeService]
})

export class AppComponent implements OnInit {
    stations : BikeStation[];
    title = 'City bikes';
    data : string

    // google maps zoom level
    zoom: number = 14;

  // initial center position for the map
  lat: number = 60.1699;
  lon: number = 24.9384;


  constructor(private bikeService: BikeService){

  }

  ngOnInit(){
      this.loadBikeStations();
  }

  private loadBikeStations(): void{
      this.bikeService.getBikeStations()
      .subscribe((stations:BikeStation[]) => this.stations = stations);

  }

}
