import { Component, OnInit } from '@angular/core';

import { HubService } from './hub.service';
import { Hub } from './hub';

import {AgmCoreModule} from 'angular2-google-maps/core';


@Component({
    selector: 'my-hub',
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
    <sebm-google-map-marker *ngFor="let hub of hubss"
                [latitude]="hub.coordinator"
                [longitude]="hub.coordinator"
                 [label]="station.name"></sebm-google-map-marker>
    </sebm-google-map>

    `,
    providers: [HubService]
})

export class HubComponent implements OnInit {
    hubs : Hub[];
    title = 'City bikes';
    data : string

    // google maps zoom level
    zoom: number = 7;

  // initial center position for the map
  lat: number = 60.1699;
  lon: number = 24.9384;


  constructor(private hubService: HubService){

  }

  ngOnInit(){
      this.loadBikeStations();
  }

  private loadBikeStations(): void{
      this.hubService.getHubs()
      .subscribe((stations:Hub[]) => this.hubs = stations);

  }

}
