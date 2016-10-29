
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
  Search Diameter
  </td>
  </tr>

  <tr (click) = "ReturnSliderValue()">
  <td class="special" colspan="3">
  <input id="ex1" #sliderIOS data-slider-id='ex1Slider' type="text" value="1" data-slider-min="0" data-slider-max="5" data-slider-step="0.1" data-slider-value="1"/>
  </td>
  </tr>
  </table>


  <div class="copyright">
  <hr>
  <img src="img/demo-logo-2.png" alt="config" style="width:40%;display:block;margin:5% auto;">
  <p>Version: 0.9.1<br>We are not responsible for any liability, or accuracy related to your use of this Site.<br><br>
  © Parking Group, Metropolia UAS. <br>
  All rights reserved.</p>
  </div>
  </div>
  <script>

});
</script>
`
})

export class LeftNavigation  extends AbstractComponent{

  @ViewChild('sliderIOS')sliderIOS: any;

  @Output()
  radiusUpdated:EventEmitter<any> = new EventEmitter<any>();

  radius:number;

  mySlider:any;
  ngAfterViewInit() {
    this.mySlider = new Slider('#ex1', {
      formatter: function(value:number) {
        this.radius = value*1000;
        return value + ' km';
      }
    }
    );
    this.radius = Number(this.sliderIOS.nativeElement.value)*1000;
  };

  ReturnSliderValue():number{
    this.radius = Number(this.sliderIOS.nativeElement.value)*1000;
    this.radiusUpdated.emit(this.radius);
    return this.radius;
  }



  SetliderValue(value:number):void{
    this.mySlider.setValue(value);
    this.radius = value*1000;
    this.radiusUpdated.emit(this.radius);
  }
}
