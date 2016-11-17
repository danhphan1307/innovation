
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
  <li routerLink="/parking" routerLinkActive="active">
  <div>
  <img src="img/Free Parking-50.png" alt="parking zone"  class="custom-img-responsive">
  <span>Parking</span>
  </div>
  </li>
  <li routerLink="/hri" routerLinkActive="active">
  <div>
  <img src="img/hri.png" alt="free parking" class="custom-img-responsive">
  <span>HRI Data</span>
  </div>
  </li>
  <li routerLink="/parkandride" routerLinkActive="active">
  <div>
  <img src="img/Park Ride-50.png" alt="park ride"  class="custom-img-responsive">
  <span>Park & Ride</span>
  </div>
  </li>
  <li routerLink="/bike" routerLinkActive="active">
  <div>
  <img src="img/Bicycle-50.png" alt="bike icon"  class="custom-img-responsive">
  <span>City Bike</span>
  </div>
  </li>
  <li routeLink="/user" routerLinkActive="active" id="testImg" #testImg>
  <div>
  <img  src="img/User-Info.png" alt="user info"  class="custom-img-responsive">
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
