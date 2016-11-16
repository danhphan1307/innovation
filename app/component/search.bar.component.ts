import {Component, ViewChild, trigger, state, style, animate, transition, Input} from '@angular/core';
import {MapService} from '../map/map.service'

@Component({
  selector: 'search-bar',

  template: `
  <div [hidden]="!bShow" >
  <div class="input-group"  id="search_input_wrap" >
  <input id="search_input" type="text" class="form-control" placeholder="Enter destination" >
  <div class="input-group-btn">
  <button class="btn btn-default" id="close_search"><span class="glyphicon glyphicon-remove"></span></button>
  </div>
  </div>
  </div>
  <div [hidden]="bShow" >
  <span class="glyphicon glyphicon-chevron-down" id="arrowDown" (click) = slide()></span>
  </div>
  <div [hidden]="!bShow">
  <span class="glyphicon glyphicon-chevron-up" id="arrowUp" (click) = slide()></span>
  </div>`,
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
