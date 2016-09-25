import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BikeStation }  from 'models/bike';

import {Observable} from 'rxjs/Rx';

//Requiered method
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class BikeService{

    private bikeUrl = 'http://api.digitransit.fi/routing/v1/routers/hsl/bike_rental';
    //private bikeUrl = 'http://content.guardianapis.com/search?api-key=test';

    constructor(private http: Http){

    }

    getBikeStations() : Observable<BikeStation[]>{
        return this.http.get(this.bikeUrl,{headers: this.getHeaders()})
        .map(this.extractData)
        .catch(this.handleError);
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

private extractData(res: Response) {
    let body = res.json();

    return body.stations|| { };
}


}