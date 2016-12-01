
import {Component, Input, animate, style, state, transition, trigger, ViewChild, Output, EventEmitter} from '@angular/core';
import {FacilityComponent} from '../facilities/facility.component';
import {ParkZoneComponent} from '../park-zone/parkzone.component'
import {MapComponent} from '../map/map.component';
import {PricingZoneEnum} from '../models/model-enum';
import {Router} from '@angular/router';

declare var Slider: any;

@Component({
  selector: 'filter',
  providers: [],

  template:
  `
  <table [hidden]="!b_OpenHelper_Facility">
  <tr>
  <th colspan="2">Filter</th>
  </tr>
  <tr *ngFor="let option of optionsFacility; let i = index;">
  <td><label>{{replaceString(option)}}</label></td>
  <td>
  <label class="switch">
  <input type="checkbox" name={{option}} id={{option}} (change)="displayAllFacility($event)"/>
  <div class="sliderIOS round"></div>
  </label>
  </td>
  </tr>
  <tr>
  <td><label>Search Radius</label></td>
  </tr>
  <tr >
  <td class="special" colspan="2" (touchend)="ReturnSliderValue()">
  <input id="ex1" #ex1Slider data-slider-id='ex1Slider' type="text" value="1" data-slider-min="0" data-slider-max="5" data-slider-step="0.1" data-slider-value="1"/>
  </td>
  </tr>
  </table>


  <table [hidden]="!b_OpenHelper_HRI">
  <tr>
  <th colspan="2">Filter</th>
  </tr>
  <tr *ngFor="let option of options; let i = index;">
  <td><label>{{replaceString(option)}}</label></td>
  <td>
  <label class="switch">

  <input type="checkbox" name={{option}} id={{option}} (change)="displayZone($event)"/>
  
  <div class="sliderIOS round"></div>
  </label>
  </td>
  </tr>
  </table>

  <table [hidden]="!b_OpenHelper_None">
  <tr>
  <th colspan="2">Filter</th>
  </tr>
  <tr>
  <td>
  <label>Nothing to setting</label>
  </td>
  </tr>
  </table>
  `
})

export class FilterPanel{
  facilityComponent:any;
  map:any;
  ZoneComponent:any;
  pricing:any;
  router:Router;

  @Output()
  radiusUpdated:EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('ex1Slider')ex1Slider: any;

  options = ['Select_All','Zone','Free', 'Unlimited_Time' ,'Max_4h_Parking', 'Max_1h_Parking', 'Parking_Facilities'];
  optionsFacility= ['Show_All'];
  b_OpenHelper_HRI:boolean = false;
  b_OpenHelper_Facility:boolean = false;
  b_OpenHelper_None:boolean = false;

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
    this.radius = 1000;
  };
  constructor(private _router: Router) {
    this.router = _router;
  }
  /**
   * [load get reference to private variable]
   * @param {any} _map      [description]
   * @param {any} _facility [description]
   * @param {any} _zone     [description]
   */
   load(_map:any, _facility:any, _zone:any){
     this.map = _map;
     this.facilityComponent = _facility;
     this.ZoneComponent = _zone;
   }

   replaceString(input:string){
     return input.replace(/_/g," ");
   }

  /**
   * [ReturnSliderValue get slider number to search, this feature is used in park and ride ]
   * @return {number} [description]
   */
   ReturnSliderValue():number{
     if(this.bState){
      /*It is a must to put the delay here. The reason is that with the touchend
      * the browser will not work properly with a short click. Tested on Chrome(54.0.2840.98)-Mac, iOS 10.1.1
      */
      setTimeout(()=> {
        this.radius = Number(this.ex1Slider.nativeElement.value)*1000;
        this.radiusUpdated.emit(this.radius);
        return this.radius;
      }, 100);
    }else{
      this.radiusUpdated.emit(0);
      return 0;
    }
  }

  /**
   * [closeAllPanel close all panel]
   */
   closeAllPanel(){
     this.b_OpenHelper_Facility=false;
     this.b_OpenHelper_HRI=false;
     this.b_OpenHelper_None=false;
     for (var i = 0; i< this.options.length; i++){
       (<HTMLInputElement>document.getElementById(this.options[i])).checked = false;
     }
     for (var i = 0; i< this.optionsFacility.length; i++){
       (<HTMLInputElement>document.getElementById(this.optionsFacility[i])).checked = false;
     }
     if(this.router.url == "/parking"){
       (<HTMLElement>document.getElementById('Free')).click();
     }
   }

  /**
   * [OpenPanel open specific panel]
   * @param {string} _panel [description]
   */
   OpenPanel(_panel:string){
     switch (_panel) {
       case 'Facility':
       this.b_OpenHelper_Facility?this.b_OpenHelper_Facility=false:this.b_OpenHelper_Facility=true;
       break;
       case "HRI":
       this.b_OpenHelper_HRI?this.b_OpenHelper_HRI=false:this.b_OpenHelper_HRI=true;
       break;
       case "None":
       this.b_OpenHelper_None?this.b_OpenHelper_None=false:this.b_OpenHelper_None=true;
       break;
       case "Close":
       this.b_OpenHelper_None=false;
       this.b_OpenHelper_HRI = false;
       this.b_OpenHelper_Facility=false;
     }
   }

  /**
   * [setButtonOnOff prevent unwanted error, explained in app.component]
   * @param {any}     _element [description]
   * @param {boolean} _status  [description]
   */
   setButtonOnOff(_element:any, _status:boolean){
     for (var i = 0; i< _element.length; i++){
       (<HTMLInputElement>document.getElementById(_element[i])).disabled = !_status;
     }
   }

  /**
   * [displayAllFacility show all facility]
   * @param {any} e [description]
   */
   displayAllFacility(e:any){
     if(e.target.checked){
       switch (e.target.name) {
         case 'Show_All':
         this.setButtonOnOff(this.optionsFacility, false);
         this.facilityComponent.loadAllFacilities(this.map,():void =>{
           this.setButtonOnOff(this.optionsFacility, true);
         });
         break;
       }
     }else{
       switch (e.target.name) {
         case 'Show_All':
         this.map.clearFacilityMarkers(false,true);
         break;
       }
     }
   }

   SetSliderState(state:boolean):void{
     this.bState= state;
     if(state){
       this.mySlider.enable();
       this.radiusUpdated.emit(this.radius);
     }else{
       this.mySlider.disable();
       this.radiusUpdated.emit(0);
     }
   }


  /**
   * [displayZone show the zone from JSON file]
   * @param {any} e [description]
   */
   displayZone(e:any){
     if(e.target.checked){
       this.setButtonOnOff(this.options, false);
       switch (e.target.name) {
         case 'Select_All':
         this.reset();
         this.checkOrUncheck(true);

         break;
         case 'Zone':
         this.map.displayKML(():void =>{
           this.setButtonOnOff(this.options, true);
         });
         break;
         case "Free":
         this.ZoneComponent.loadZones(PricingZoneEnum.FREE_1,this.map);
         this.ZoneComponent.loadZones(PricingZoneEnum.FREE_2,this.map,():void =>{
           this.setButtonOnOff(this.options, true);
         });
         break;

         case "Max_4h_Parking":
         this.ZoneComponent.loadZones(PricingZoneEnum.PAID_5,this.map,():void =>{
           this.setButtonOnOff(this.options, true);
         });
         break;

         case "Unlimited_Time":
         this.ZoneComponent.loadZones(PricingZoneEnum.PAID_3,this.map,():void =>{
           this.setButtonOnOff(this.options, true);
         });
         break;

         case "Max_1h_Parking":
         this.ZoneComponent.loadZones(PricingZoneEnum.PAID_2,this.map,():void =>{
           this.setButtonOnOff(this.options, true);
         });
         break;

         case "Parking_Facilities":
         this.ZoneComponent.putEntrances(this.map);
         this.ZoneComponent.loadZones(PricingZoneEnum.PAID_1,this.map);
         this.ZoneComponent.loadZones(PricingZoneEnum.PAID_4,this.map,():void =>{
           this.setButtonOnOff(this.options, true);
         });
         break;
       }

     }else{
       switch (e.target.name) {
         case 'Select_All':
         this.reset();
         this.checkOrUncheck(false);
         break;
         case 'Zone':
         this.map.clearKML();
         break;
         case "Free":
         this.map.clearPolygonIndex(0);
         break;

         case "Max_4h_Parking":
         this.map.clearPolygonIndex(1);
         break;

         case "Unlimited_Time":
         this.map.clearPolygonIndex(2);
         break;

         case "Max_1h_Parking":
         this.map.clearPolygonIndex(3);
         break;

         case "Parking_Facilities":
         this.map.clearPolygonIndex(4);
         this.map.clearMarkers();
         break;
       }
     }
   }

  /**
   * [checkOrUncheck this function is for check all]
   * @param {boolean}  _bool [description]
   * @param {()=>void} _func [description]
   */
   checkOrUncheck(_bool:boolean, _func?:()=>void){
     for (var i = 1; i< this.options.length; i++){
       (<HTMLInputElement>document.getElementById(this.options[i])).checked = _bool;
     }
     if(_bool){
       this.map.displayKML();
       this.ZoneComponent.putEntrances(this.map);
       this.ZoneComponent.loadZones(PricingZoneEnum.FREE_1,this.map);
       this.ZoneComponent.loadZones(PricingZoneEnum.FREE_2,this.map);
       this.ZoneComponent.loadZones(PricingZoneEnum.PAID_1,this.map);
       this.ZoneComponent.loadZones(PricingZoneEnum.PAID_2,this.map);
       this.ZoneComponent.loadZones(PricingZoneEnum.PAID_4,this.map);
       this.ZoneComponent.loadZones(PricingZoneEnum.PAID_5,this.map);
       this.ZoneComponent.loadZones(PricingZoneEnum.PAID_3,this.map,()=>{
         this.setButtonOnOff(this.options, true)
       });
     }
   }

  /**
   * [reset remove everything]
   */
   reset(){
     this.map.clearKML();
     this.map.clearMarkers();
     for(var i = 0;i<5;i++){
       this.map.clearPolygonIndex(i);
     }
   }
 }
