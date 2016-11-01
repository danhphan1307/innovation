import { Component, OnInit, ViewChild, trigger, state, style, animate, transition} from '@angular/core';
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
  </div>`,
  providers: []
})

export class UserComponent extends AbstractComponent implements OnInit {
  ngOnInit(){
    this.state='close';
  }
}
