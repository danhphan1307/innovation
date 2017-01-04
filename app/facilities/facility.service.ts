import {Injectable} from '@angular/core';
import {Http, Response, Headers,URLSearchParams, RequestOptions } from '@angular/http';
import {Facility }  from './facility';
import {Coords} from '../models/location';
import {Observable} from 'rxjs/Rx';

//Requiered method
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FacilityService{

  private facilityUrl = 'https://p.hsl.fi/api/v1/facilities';

  constructor(private http: Http){
  }

  /**
   * Http service to get all available facilities. Used for testing purpose only
   * @return {Observable<Facility[]>} [observable array of facilities]
   */
  getAllFacilities() : Observable<Facility[]>{
    return this.http.get(this.facilityUrl,{headers: this.getHeaders()})
    //.map(this.mapStations)
    .map(this.extractData)
    .catch(this.handleError);
  }

  /**
   * Http service to get all facilities within a given radius
   * @param  {Coords}                 coords [Center coordinations]
   * @param  {number}                 radius [Radius in which scan will be performed]
   * @return {Observable<Facility[]>}        [Observable array of facilities]
   */
  getFaclitiesNearby(coords: Coords, radius: number): Observable<Facility[]>{
    let params: URLSearchParams = new URLSearchParams();
    let strParams = "POINT(" + String(coords.lon) + "+" + String(coords.lat) + ")";
    params.set('geometry', strParams);
    params.set('maxDistance', String(radius));
    let options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: params
    });
    return this.http.get(this.facilityUrl,options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.results || { };
  }


  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}