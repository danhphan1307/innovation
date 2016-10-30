
import {Component, Input, animate, style, state, transition, trigger} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';

@Component({
  moduleId: module.id,
  selector: 'bottom-nav',
  providers: [],
  animations: [

  trigger("animationBottomNav", [
    state("open", style({height:"70%"})),
    state("close", style({height: "0" })),
    transition("open <=> close", animate( "250ms" )),
    ])
  ],

  template:
  `
  <div class="bottomNav">
  <div class="bottomDiv" [@animationBottomNav]="state">
  </div>
  <nav>
  <ul>
  <!--
  <li>
  <span class="glyphicon glyphicon-menu-up"></span><br>
  <span class="glyphicon glyphicon-map-marker" style="display:inline-block; margin-right:1px;"></span> Near you
  </li>
  <li>
  <span class="glyphicon glyphicon-menu-up"></span><br>
  <span class="glyphicon glyphicon-heart" style="display:inline-block; margin-right:5px;"></span>Your Favorites
  </li>
  !-->
  
  <li>
  <a routerLink="abc" routerLinkActive="active"><img src="img/Free Parking-50.png" alt="free parking" class="custom-img-responsive"></a>
  </li>
  <li>
  <a routerLink="abc" routerLinkActive="active"><img src="img/Paid Parking-50.png" alt="paid parking"  class="custom-img-responsive"></a>
  </li>
  <li>
  <a routerLink="abc" routerLinkActive="active"><img src="img/Parking Zone-50.png" alt="parking zone"  class="custom-img-responsive"></a>
  </li>
  <li>
  <a routerLink="/parking" routerLinkActive="active"><img src="img/Park Ride-50.png" alt="park ride"  class="custom-img-responsive"></a>
  </li>
  <li>
  <a routerLink="/bike" routerLinkActive="active"><img src="img/Bicycle-50.png" alt="bike icon"  class="custom-img-responsive"></a>
  </li>
  <li>
  <a routerLink="abc" routerLinkActive="active"><img src="img/User-Info.png" alt="user info"  class="custom-img-responsive"></a>
  </li>
  </ul>
  </nav>
  </div>

  `
})
export class BottomNavigation  extends AbstractComponent{
  
}
