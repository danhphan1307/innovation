import { Component, OnInit, ViewChild, trigger, state, style, animate, transition, Input} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';
import {BlackOverlay} from '../component/blackoverlay.component';
import {Coords} from '../models/location';

var localStorage_isSupported = (function () {
  try {
    var itemBackup = localStorage.getItem("");
    localStorage.removeItem("");
    localStorage.setItem("", itemBackup);
    if (itemBackup === null)
      localStorage.removeItem("");
    else
      localStorage.setItem("", itemBackup);
    return true;
  }
  catch (e) {
    return false;
  }
})();

@Component({
  selector: 'router-outlet',
  animations: [

  trigger("animationBottomNav", [
    state("open", style({height:"30%", display: "block"})),
    state("close", style({height: "0", display: "none" })),
    transition("open <=> close", animate( "250ms" )),
    ])
  ],
  template: `<div class="bottomDiv" [@animationBottomNav]="state">
  <div class="locationPanel"><span class="glyphicon glyphicon-map-marker" style="margin-right:5px;"></span> Your car location</div>
  <div class="content">You left your car/bike at<br>
  Location: {{this.object.name.en}}<br>
  Time: {{this.object.date}}</div>`,
  providers: []
})

export class UserComponent extends AbstractComponent implements OnInit {
  object: any ={
    "name": {
      "fi": "Sorry, you did not save your car/bike location",
      "sv": "Sorry, you did not save your car/bike location",
      "en": "Sorry, you did not save your car/bike location"
    },
    "date": "No date data"
  };

  ngOnInit(){
    this.state='close';
    if(localStorage_isSupported){
      if (localStorage.getItem("carLocation") !== null) {
        this.object = JSON.parse(localStorage.getItem('carLocation'));
      }
    } else {
      this.object.name.en = "Sorry, your browser does not support this function.";
    }
  }

  updateSave(event:any){
    if(localStorage_isSupported){
      this.object = event;
    }
  }
}
