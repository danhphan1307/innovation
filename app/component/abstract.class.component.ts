import { Component, Injectable } from '@angular/core';

export abstract class AbstractComponent {
  public state = 'close';

  /**
   * [setState set state of the component]
   * @param {string} sState [description]
   */
  public setState(sState: string){
    this.state = sState;
  }

  /**
   * [getState return open or close state]
   */
  public getState(){
    return this.state;
  }

  /**
   * [beginAnim start the animation for open event]
   */
  public beginAnim(){
    this.state = 'open';
  }

  /**
   * [closeAnim star the animation for close event]
   */
  closeAnim():void{
    this.setState('close');
  }
}
