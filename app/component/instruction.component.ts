import { Component } from '@angular/core';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
function localStorage_hasData() {
  try {
    return (localStorage.getItem("showInstruction") =='true');
  }
  catch (e) {
    return false;
  }
};
@Component({
  selector: 'carouselInstruction',
  templateUrl: 'instruction.component.html',
})
export class CarouselComponent {
  public myInterval:number = 0;
  private pictureNumber:number = 8;
  public noWrapSlides:boolean = true;
  public slides:Array<any> = [];
  state:boolean=false;

  public constructor() {
    for (let i = 0; i < this.pictureNumber; i++) {
      this.addSlide();
    }
    if(localStorage_hasData()){
      this.state=true;
    }
  }

  public closeInstruction(){
    this.state = false;
    localStorage.setItem('showInstruction',(!(<HTMLInputElement>document.getElementById('showInstructionCheckbox')).checked).toString());
  }

  public showInstruction(){
    console.log('click');
    this.state = true;
  }

  public addSlide():void {
    let newWidth = this.slides.length + 1;
    this.slides.push({
      image: `../img/${newWidth}.png`,
      title:`${['Parking', 'Ticket', 'Payment', 'Finding', 'Park and Ride', 'City Bikes', 'User Information', 'Let\'s Park'][this.slides.length % this.pictureNumber]}`,
      text: `${['You can instant see the parking price of your current location', 'Cannot be simplier to buy a ticket', 'Why have to pay with coin when you can uses our app ?', 'Access Helsinki Region Infoshare Database to find a parking spot', 'Park your car and use public transportation to save the enviroment', 'Bicycling arround the city. Why not ?', 'Get your car location, even offline!', ''][this.slides.length % this.pictureNumber]}`
    });
  }
}