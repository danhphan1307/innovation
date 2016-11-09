
import {Component, Input, animate, style, state, transition, trigger, ViewChild, Output, EventEmitter} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';

declare var Slider: any;

@Component({
  moduleId: module.id,
  selector: 'left-nav',
  providers: [],
  animations: [

  trigger("animationLeftNav", [
    state("open", style({left:0})),
    state("close", style({left: "-70%" })),
    transition("open <=> close", animate( "200ms" )),
    ])
  ],


  template:
  `
  <div id="mySidenav" class="sidenav" [@animationLeftNav]="state">
  <img src="img/cog.png" alt="config" style="width:40%;display:block;margin:auto;margin-top:10%;">
  <table>
  <tr>
  <td>
  <span class="glyphicon glyphicon-map-marker" ></span>
  </td>
  <td>
  Location Detect
  </td>
  <td>
  <label class="switch">
  <input type="checkbox">
  <div class="sliderIOS round"></div>
  </label>
  </td>
  </tr>

  <tr>
  <td>
  <img src="img/diameter.png" alt="diameter of the search"/>
  </td>
  <td colspan="2">
  Search Diameter - P&R
  </td>
  </tr>

  <tr (click) = "ReturnSliderValue()">
  <td class="special" colspan="3">
  <input id="ex1" #ex1Slider data-slider-id='ex1Slider' type="text" value="1" data-slider-min="0" data-slider-max="5" data-slider-step="0.1" data-slider-value="1"/>
  </td>
  </tr>
  </table>


  <div class="copyright">
  <hr style="margin-top:0;margin-bottom:0;">
  <img src="img/demo-logo-2.png" alt="config" style="width:40%;display:block;margin:2% auto;">
  <p>Version: 0.9.1<br>
  © Parking Group<br></p>
  </div>
  </div>
  <script>

});
</script>
`
})

export class LeftNavigation  extends AbstractComponent{

  @ViewChild('ex1Slider')ex1Slider: any;

  @Output()
  radiusUpdated:EventEmitter<any> = new EventEmitter<any>();

  radius:number;
  mySlider:any;
  bState:boolean = true;
  ngAfterViewInit() {
    this.mySlider = new Slider('#ex1', {
      formatter: function(value:number) {
        this.radius = value*1000;
        return value + ' km';
      }
    }
    );
    this.radius = Number(this.ex1Slider.nativeElement.value)*1000;
  };

  ReturnSliderValue():number{
    if(this.bState){
      this.radius = Number(this.ex1Slider.nativeElement.value)*1000;
      this.radiusUpdated.emit(this.radius);
      return this.radius;
    }else{
      this.radiusUpdated.emit(0);
      return 0;
    }

  }

  SetliderState(state:boolean):void{
    this.bState= state;
    if(state){
      this.mySlider.enable();
      this.radiusUpdated.emit(this.radius);
    }else{
      this.mySlider.disable();
      this.radiusUpdated.emit(0);
    }
  }
}
