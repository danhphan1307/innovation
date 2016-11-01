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
  moduleId: module.id,
  selector: 'user-component',
  animations: [

  trigger("animationBottomNav", [
    state("open", style({height:"70%"})),
    state("close", style({height: "0" })),
    transition("open <=> close", animate( "250ms" )),
    ])
  ],
  template: `<div class="bottomDiv" [@animationBottomNav]="state">
  <div class="locationPanel"><img src="img/mapPin.png" id="saveIcon" alt="save icon">Your car location:</div>
  <div class="content">{{this.object.name.en}}</div>
  <div class="lovePanel"><img src="img/mapPin.png" id="saveIcon" alt="save icon">Love Bike Station</div>
  <div class="content"></div>
  </div>`,
  providers: []
})

export class UserComponent extends AbstractComponent implements OnInit {
  object: any ={
    "name": {
      "fi": "Sorry, you did not save your car/bike location",
      "sv": "Sorry, you did not save your car/bike location",
      "en": "Sorry, you did not save your car/bike location"
    }
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
