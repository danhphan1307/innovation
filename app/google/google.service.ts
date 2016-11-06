import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Coords} from '../models/location'

import {Observable} from 'rxjs/Rx';
declare var google: any;
//Requiered method
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GoogleService{

  constructor(private http: Http){

  }

  //Create a google based map
  public createMap(center: Coords,zoom: number): any{
    var mapProperties = {
      center: new google.maps.LatLng(center.lat, center.lon),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(document.getElementById("mapCanvas"), mapProperties);
  }

  //wrapper for marker later
  public createMarker( coords: Coords,icon:string, map: any ): any{
    return new google.maps.Marker({
      position: new google.maps.LatLng(coords.lat,coords.lon),
      icon: icon,
      map: map
    });
  }

  //Create a circle on the map
  public createCircle(coords: Coords, radius: number, map: any): any{
    return new google.maps.Circle({
      strokeColor: '#4a6aa5',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      map: map,
      center: new google.maps.LatLng(coords.lat,coords.lon),
      radius: radius
    });
  }

  public createPolygon(path : any[] = [], colorCode: string){
    return  new google.maps.Polygon({
      paths: path,
      strokeColor: colorCode,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillOpacity: 0
    });
  }

  public showWaypoints(start: Coords, end: Coords){
    console.log("to be implemented")
  }



}