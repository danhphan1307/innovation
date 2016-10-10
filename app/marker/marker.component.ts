
import { Component, OnInit} from '@angular/core';
import {MapService} from '../map/map.service'
import {MapComponent} from '../map/map.component'
import global = require('../globals');
import {Marker} from './marker';
declare var google: any;


@Component({
    moduleId: module.id,
    selector: 'marker-gg',
    template: `
    <div id="mapCanvas" ></div>
    `,
    providers: [MapService]
})

export class MarkerComponent{

    centerLat: number
    centerLon: number
    //map : any;
    marker: Marker;
    map: any

    constructor(private mapService: MapService,marker: Marker){
        this.marker = marker;
    }

    ngOnInit(){
        this.createMarker();
    }
    createMarker(): void{
        this.map = new google.maps.Map(document.getElementById("mapCanvas"));

        this.mapService.placeMarkers(this.marker.lon,this.marker.lon,this.map);

    }

}