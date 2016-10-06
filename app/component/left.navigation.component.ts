
import {Component, Input, animate, style, state, transition, trigger} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';

@Component({
  moduleId: module.id,
  selector: 'left-nav',
  providers: [],
  animations: [

  trigger("animationLeftNav", [
    state("open", style({left:0})),
    state("close", style({left: "-70%" })),
    transition("open <=> close", animate( "200ms" )),
    ]),
  trigger("animationBlackOverlay", [
    state("open", style({display:"block", opacity:1})),
    state("close", style({isplay:"none", opacity:0})),
    transition("open <=> close", animate( "1ms" )),
    ])
  ],

  template:
  `
  <div id="mySidenav" class="sidenav" [@animationLeftNav]="state">
  <nav>
  <img src="img/logo.png" alt="logo" id="logo">
  <h2>Helsinki Parking</h2>
  <hr>
  <a href="/asdas"><img src="img/bikeIcon.png" alt="bike icon" style="display:inline-block; margin-right:10px;">Free Parking <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  <a href="#"><img src="img/bikeIcon.png" alt="bike icon" style="display:inline-block; margin-right:10px;">Paid Parking <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  <a href="#"><img src="img/bikeIcon.png" alt="bike icon" style="display:inline-block; margin-right:10px;">Paid Parking Zones <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  <a class="active" href="#"><img src="img/bikeIcon.png" alt="bike icon" style="display:inline-block; margin-right:10px;">City Bicycle <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  </nav>
  </div>
  `
})
export class LeftNavigation  extends AbstractComponent{
  
}
