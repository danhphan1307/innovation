
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
    state("close", style({display:"none", opacity:0})),
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
  <a href="#"><img src="img/Free Parking-50.png" alt="free parking" style="display:inline-block; margin-right:10px;">Free Parking<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  <a href="#"><img src="img/Paid Parking-50.png" alt="paid parking" style="display:inline-block; margin-right:10px;">Paid Parking<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  <a href="#"><img src="img/Parking Zone-50.png" alt="parking zone" style="display:inline-block; margin-right:10px;">Parking Zones<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  <a href="facility"><img src="img/Park Ride-50.png" alt="park ride" style="display:inline-block; margin-right:10px;">Park and Ride<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  <a class="active" href="#"><img src="img/Bicycle-50.png" alt="bike icon" style="display:inline-block; margin-right:10px;">City Bicycle<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  </nav>
  </div>
  `
})
export class LeftNavigation  extends AbstractComponent{

}
