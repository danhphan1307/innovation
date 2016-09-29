import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Hub }  from './hub';

import {Observable} from 'rxjs/Rx';

//Requiered method
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HubService{

  private hubUrl = 'https://p.hsl.fi/api/v1/hubs';


    constructor(private http: Http){

    }

    getHubs() : Observable<Hub[]>{
      return this.http.get(this.hubUrl,{headers: this.getHeaders()})
      //.map(this.mapStations)
      .map(this.extractData)
      .do(data => console.log('All: ' +  JSON.stringify(data)))
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