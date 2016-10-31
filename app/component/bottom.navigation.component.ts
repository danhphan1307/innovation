
import {Component, Input, ViewChild} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';
import {UserComponent} from '../component/user.panel.component';
import {BlackOverlay} from '../component/blackoverlay.component';

@Component({
  moduleId: module.id,
  selector: 'bottom-nav',
  providers: [],

  template:
  `
  <div class="bottomNav">
  <user-component ></user-component>
  <nav>
  <ul>
  
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
  <a routeLink="/user" (click)="show()" routerLinkActive="active"><img src="img/User-Info.png" alt="user info"  class="custom-img-responsive"></a>
  </li>
  </ul>
  </nav>
  </div>

  `
})
export class BottomNavigation  extends AbstractComponent{
  @ViewChild(UserComponent)
  private userComponent: UserComponent;
  @ViewChild(BlackOverlay)
  private blackOverlay:BlackOverlay;

  show():void{
    //this.blackOverlay.setState('open');
    this.userComponent.setState('open');
  }
}
