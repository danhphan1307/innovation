import { Component, Injectable } from '@angular/core';

export abstract class AbstractComponent {
  public state = 'close';

  public setState(sState: string){
    this.state = sState;
  }

  public getState(){
    return this.state;
  }

  public beginAnim(){
    this.state = 'open';
  }
  
  closeAnim():void{
    this.setState('close');
  }
}
