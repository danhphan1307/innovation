import {Component, ViewChild, trigger, state, style, animate, transition, Input} from '@angular/core';
import {MapService} from '../map/map.service'

@Component({
  selector: 'search-bar',

  template: `
  <div class="input-group" id="input-group">
  <input id="search_input" type="text" class="form-control" placeholder="Enter destination" >
  <div class="input-group-btn">
  <button class="btn btn-default" id="close_search"><span class="glyphicon glyphicon-remove"></span></button>
  </div>
  </div>
  `,
  providers: []
})

export class SearchBar {
  bShow:boolean ;
  values:string;
  service: MapService;
  
  constructor(private _mapService: MapService) {
    this.bShow = true;
    this.values  = '';
    this.service = _mapService;
  }
  slide(){
    this.bShow ? this.bShow=false : this.bShow=true;

  }
}
