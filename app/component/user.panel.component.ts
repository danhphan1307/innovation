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
var localStorage_hasData = (function () {
  try {
    if(localStorage_isSupported){
      if(localStorage.getItem("carLocation") !== null){
        return true;
      }else {
        return false;
      }
    } else {
      return false;
    }
  }
  catch (e) {
    return false;
  }
})();

@Component({
  selector: 'user-panel',
  animations: [

  trigger("animationBottomNav", [
    state("open", style({height:"50%", display: "block"})),
    state("close", style({height: "0", display: "none" })),
    transition("open <=> close", animate( "250ms" )),
    ])
  ],
  template: `<div class="bottomDiv" [@animationBottomNav]="state">

  <img src="img/person.png" alt="user icon" id="person">
  <div class="locationPanel"><span class="glyphicon glyphicon-map-marker" style="margin-right:5px;"></span> Car location</div>
  <div class="content">{{this.temp_object.name.en}}<br>
  Park time: {{dateString}}<br>
  Time pass: {{diff}}</div>`,
  providers: []
})

export class UserComponent extends AbstractComponent implements OnInit {
  temp_object: any ={
    "name": {
      "fi": "Sorry, you did not save your car location",
      "sv": "Sorry, you did not save your car location",
      "en": "Sorry, you did not save your car location"
    }
  };
  dateString:string = "No data";
  date:any;
  diff:string ="No data";

  ngOnInit(){
    this.date = this.convertDateString(new Date());
    this.state='close';
    if(localStorage_isSupported){
      if (localStorage_hasData) {
        this.temp_object = JSON.parse(localStorage.getItem('carLocation'));
        this.dateString = this.convertDateString(this.temp_object.date);
        this.diff = this.diffTwoDay(new Date(), new Date(this.temp_object.date));
      }
    } else {
      this.temp_object.name.en = "Sorry, your browser does not support this function.";
    }
    setInterval(() => {
      if(localStorage_hasData){
        this.date =  this.convertDateString(new Date());
        this.diff = this.diffTwoDay(new Date(), new Date (this.temp_object.date));
        localStorage.setItem('duration',(this.diff));
      }

    }, 1000);
  }

  updateSave(event:any){
    if(localStorage_isSupported){
      if(event==null){
        //this.temp_object.name.en = "Why copy me..";
        this.dateString = "No data";
        this.diff ="No data";

        localStorage_hasData = false;
      }else{
        localStorage_hasData = true;
        this.temp_object = event;
        this.dateString = this.convertDateString(this.temp_object.date);
      }
    }
  }

  convertDateString(_date:any):string{
    var d = new Date(_date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
  }

  diffTwoDay(_date1:any, _date2:any):string{
    var timeDiff = Math.abs(_date1.getTime() - _date2.getTime());
    var diffHour = Math.round((timeDiff % 86400000) / 3600000);
    var diffMinute = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
    var diffSecond = Math.round((((timeDiff % 86400000) % 3600000) % 60000) /1000);
    return ("0"+(String)(diffHour)).slice(-2)+ ":" +  ("0"+(String)(diffMinute)).slice(-2) + ":" +  ("0"+(String)(diffSecond)).slice(-2);
  }
}
