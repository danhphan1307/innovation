export abstract class AbstractComponent {
  public state = 'close';

  public setState(sState: string){
    this.state = sState;
  }

  public getState(){
    return this.state;
  }

  public beginAnim(){
    //this.state = this.state === 'open' ? 'closed' : 'open';
    this.state = 'open';
  }
  
  //abstract closeAnim():void;
  closeAnim():void{
    this.setState('close');
  }
}
