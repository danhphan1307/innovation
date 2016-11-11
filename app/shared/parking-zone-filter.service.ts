import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {ParkingType} from '../models/parking-type';

import {Observable} from 'rxjs/Rx';

//Requiered method
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ParkingZoneFilterService{

    constructor(private http: Http){

    }


    //Test get data from files
    getParkingZone() : Observable<ParkingType[]> {
        return this.http.get('../free-and-paid-parking.json')
        .map(res => res.json().features)
        .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body.stations || { };
    }


    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    private handleError (error: any) {
  // In a real world app, we might use a remote logging infrastructure
  // We'd also dig deeper into the error to get a better message
  let errMsg = (error.message) ? error.message :
  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return Observable.throw(errMsg);
}


}