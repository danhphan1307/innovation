import { Component, OnInit, ViewChild, trigger, state, style, animate, transition, Input} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';
import {BlackOverlay} from '../component/blackoverlay.component';
import {Coords} from '../models/location';

@Component({
  selector: 'user-panel',
  animations: [

  trigger("animationBottomNav", [
    state("open", style({height:"70%",opacity:'1', display: "block"})),
    state("close", style({height: "0",opacity:'0', display: "none" })),
    transition("open <=> close", animate( "250ms" )),
    ])
  ],
  template: `<div class="bottomDiv" [@animationBottomNav]="state">
  <div class="locationPanel"></div>
  <img src="img/person.png" alt="user icon" id="person">
  <div class="content">{{name}}<br>
  Ticket: {{ticket}}<br>
  Park time: {{time}}<br>
  Time pass: {{diff}}
  <div class="developer">
    <hr>
    <img src="img/logo.png" alt="logo"><br>
    Version: 1.0.0
  </div>
  </div>`,
  providers: []
})

export class UserComponent extends AbstractComponent implements OnInit {
  name:string = "Sorry, you did not save your car location";
  time:any;
  diff:any;
  ticket:any;
  ngOnInit(){
    var object = JSON.parse(localStorage.getItem('carLocation'));
    this.name = object.name.en;
    this.time = localStorage.getItem('date');
    (this.time!="No data")? this.time = this.convertDateString(this.time):this.time = this.time ;
    this.diff = localStorage.getItem('duration');
    this.ticket = localStorage.getItem('ticket');
    setInterval(() => {
      if(this.name!="Sorry, you did not save your car location"){
        this.diff = this.diffTwoDay(new Date(), new Date (localStorage.getItem('date')));
        localStorage.setItem('duration',this.diff);
      }

    }, 1000);
  }

  /**
   * [updateSave description]
   * @param {any} event [description]
   */
  updateSave(event:any){
    if(event!=null){
      this.name = event.name.en;
      this.time = this.convertDateString(localStorage.getItem('date'));
      this.ticket = localStorage.getItem('ticket');
      this.diff = localStorage.getItem('duration');
    }else {
      this.name = "Sorry, you did not save your car location";
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
   * [diffTwoDay description]
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
