import { Component, OnInit } from '@angular/core';

import { BikeService } from './services/bike.service';
import {BikeStation} from './models/bike';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <p>{{data}}</p>
    <ul>
        <li *ngFor="let station of stations">{{station.name}}</li>
    </ul>
    `,
    providers: [BikeService]
})

export class AppComponent implements OnInit {
    stations : BikeStation[];
    title = 'City bikes';
    data : string
    constructor(private bikeService: BikeService){

    }

    ngOnInit(){
        this.loadBikeStations();
    }

    private loadBikeStations(): void{
        this.bikeService.getBikeStations()
        .subscribe(stations => this.stations = stations);

    }

}
