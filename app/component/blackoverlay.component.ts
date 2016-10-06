
import {Component, Input, animate, style, state, transition, trigger} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';

@Component({
  moduleId: module.id,
  selector: 'blackoverlay',
  providers: [],
  animations: [
  trigger("animationBlackOverlay", [
    state("open", style({display:"block", opacity:1})),
    state("close", style({isplay:"none", opacity:0})),
    transition("open <=> close", animate( "1ms" )),
    ])
  ],

  template:
  `
  <div id="blackOverlay" [@animationBlackOverlay]="state" (click)="closeAnim()">

  </div>
  `
})
export class BlackOverlay extends AbstractComponent{
}
