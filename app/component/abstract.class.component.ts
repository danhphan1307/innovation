import { Component, Injectable } from '@angular/core';

export abstract class AbstractComponent {
  public state = 'close';

  /**
   * [setState description]
   * @param {string} sState [description]
   */
  public setState(sState: string){
    this.state = sState;
  }

  /**
   * [getState description]
   */
  public getState(){
    return this.state;
  }

  /**
   * [beginAnim description]
   */
  public beginAnim(){
    this.state = 'open';
  }

  /**
   * [closeAnim description]
   */
  closeAnim():void{
    this.setState('close');
  }
}
