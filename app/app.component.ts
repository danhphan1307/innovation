import { Component, OnInit,  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  ViewChild} from '@angular/core';

  import {BikeService } from './bikes/bike.service';
  import {BikeStation} from './bikes/bike';
  import {LeftNavigation} from './component/left.navigation.component';

  import {AgmCoreModule} from 'angular2-google-maps/core';
  import {AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
  import {NgModel} from '@angular/forms';

  @Component({
    moduleId: module.id,
    selector: 'my-app',
    styles: [`
    .sebm-google-map-container {
      height: 900px;
    }
    `],
    templateUrl: 'app.component.html',
    providers: [BikeService],
  })

  export class AppComponent implements OnInit {
    
    @ViewChild(LeftNavigation)
    private leftNav:LeftNavigation;

    stations : BikeStation[];
    title = 'City bikes';
    data : string

    // google maps zoom level
    zoom: number = 14;

  // initial center position for the map
  lat: number = 60.1699;
  lon: number = 24.9384;
  iconUrl = '../img/largeBike.png';


  constructor(private bikeService: BikeService){

  }

  ngOnInit(){
    this.loadBikeStations();
  }

  private loadBikeStations(): void{
    this.bikeService.getBikeStations()
    .subscribe((stations:BikeStation[]) => this.stations = stations);
  }

  public beginAnim():void{
    this.leftNav.beginAnim();
  }

}
