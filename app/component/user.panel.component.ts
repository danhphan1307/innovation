import { Component, OnInit, ViewChild, trigger, state, style, animate, transition, Input} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';
import {BlackOverlay} from '../component/blackoverlay.component';
import {Coords} from '../models/location';

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
  <div class="content">{{this.object.name.en}}</div>
  </div>`,
  providers: []
})

export class UserComponent extends AbstractComponent implements OnInit {
  object: any;

  ngOnInit(){
    this.state='close';
    this.object = JSON.parse(localStorage.getItem('carLocation'));
  }

  updateSave(event:any){
    this.object = event;
  }
}
