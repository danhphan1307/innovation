import { Component, OnInit, ViewChild, trigger, state, style, animate, transition, Input} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';
import {BlackOverlay} from '../component/blackoverlay.component';
import {Coords} from '../models/location';
import { CarouselComponent } from '../component/instruction.component';

@Component({
  selector: 'user-panel',
  animations: [

  trigger("animationBottomNav", [
    state("open", style({height:"85%",opacity:'1', display: "block"})),
    state("close", style({height: "0",opacity:'0', display: "none" })),
    transition("open <=> close", animate( "250ms" )),
    ])
  ],
  template: `<div class="bottomDiv" [@animationBottomNav]="state">
  <div class="content">
  <div class="userInfo">
  <div id="userInfoTitle">Parking Info</div>
  <div id="userInfoContent">
  Location: {{name}}<br>
  Ticket: {{ticket}}<br>
  Park time: {{time}}<br>
  Time pass: {{diff}}
  </div>
  </div>
  <button id="instruction" (click)="carouselComponent.showInstruction()">
  Instruction
  </button>
  </div>
  <div class="developer">
  <hr>
  Version: 1.0<br>
  Copyright: Parking Group

  </div></div>`,
  providers: []
})

export class UserComponent extends AbstractComponent implements OnInit {
  name:string = "No data";
  time:any;
  diff:any;
  ticket:any;
  carouselComponent:CarouselComponent;

  ngOnInit(){
    var object = JSON.parse(localStorage.getItem('carLocation'));
    this.name = object.name.en;
    this.time = localStorage.getItem('date');
    (this.time!="No data")? this.time = this.convertDateString(this.time):this.time = this.time ;
    this.diff = localStorage.getItem('duration');
    this.ticket = localStorage.getItem('ticket');
    setInterval(() => {
      if(this.name!="No data"){
        this.diff = this.diffTwoDay(new Date(), new Date (localStorage.getItem('date')));
        localStorage.setItem('duration',this.diff);
      }else {
        this.diff = "No data";
      }
    }, 1000);
  }

  loadElement(_ele:any){
    this.carouselComponent = _ele;
  }

  /**
   * [updateSave emiter handler]
   * @param {any} event [description]
   */
   updateSave(event:any){
     if(event!=null){
       this.name = event.name.en;
       this.time = this.convertDateString(localStorage.getItem('date'));
       this.ticket = localStorage.getItem('ticket');
       this.diff = localStorage.getItem('duration');
     }else {
       this.name = "No data";
       this.time = "No data";
       this.diff = "No data";
       this.ticket = "No data";
     }
   }

  /**
   * [Utility for date to string conversion]
   * @param  {any}    _date [description]
   * @return {string}       [description]
   */
   convertDateString(_date:any):string{
     var d = new Date(_date);
     return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
     d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
   }

  /**
   * [diffTwoDay print the different of two days in hours, maximum is 24hrs only]
   * @param  {any}    _date1 [description]
   * @param  {any}    _date2 [description]
   * @return {string}        [description]
   */
   diffTwoDay(_date1:any, _date2:any):string{
     var timeDiff = Math.abs(_date1.getTime() - _date2.getTime());
     var diffHour = Math.round((timeDiff % 86400000) / 3600000);
     var diffMinute = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
     var diffSecond = Math.round((((timeDiff % 86400000) % 3600000) % 60000) /1000);
     return ("0"+(String)(diffHour)).slice(-2)+ ":" +  ("0"+(String)(diffMinute)).slice(-2) + ":" +  ("0"+(String)(diffSecond)).slice(-2);
   }
 }
