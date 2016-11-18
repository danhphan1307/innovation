
import {Component, Input, ViewChild, ElementRef, Renderer} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';
import {BlackOverlay} from '../component/blackoverlay.component';

@Component({
  selector: 'bottom-nav',
  providers: [],

  template:
  `
  <div class="bottomNav">
  <nav>
  <ul>
  <li routerLink="/parking" routerLinkActive="active" id="parking">
  <div>
  <i class="fa fa-car fa-2x custom-i"></i>
  <span>Parking</span>
  </div>
  </li>
  <li routerLink="/hri" routerLinkActive="active" id="hri">
  <div>
  <i class="fa fa-database fa-2x custom-i"></i>
  <span>Data</span>
  </div>
  </li>
  <li routerLink="/parkandride" routerLinkActive="active" id="parkandride">
  <div>
  <i class="fa fa-train fa-2x custom-i"></i>
  <span>Park & Ride</span>
  </div>
  </li>
  <li routerLink="/bike" routerLinkActive="active" id="bike">
  <div>
  <i class="fa fa-bicycle fa-2x custom-i"></i>
  <span>City Bikes</span>
  </div>
  </li>
  <li routerLink="/user" routerLinkActive="active" id="user">
  <div>
  <i class="fa fa-user-o fa-2x custom-i"></i>
  <span>User Info</span>
  </div>
  </li>
  </ul>
  </nav>
  </div>

  `
})
export class BottomNavigation  extends AbstractComponent{

}
