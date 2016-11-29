
import {Component, Input, animate, style, state, transition, trigger} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';

@Component({
  selector: 'blackoverlay',
  providers: [],
  animations: [
  trigger("animationBlackOverlay", [
    state("full", style({display:"block", opacity:1, height:"100%"})),
    state("open", style({display:"block", opacity:1})),
    state("close", style({isplay:"none", opacity:0})),
    transition("open <=> close", animate( "1ms" )),
    ])
  ],

  template:
  `
  <div id="blackOverlay" [@animationBlackOverlay]="state">

  </div>
  `
})
export class BlackOverlay extends AbstractComponent{
}
