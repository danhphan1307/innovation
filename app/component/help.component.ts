import { Component, OnInit, ViewChild, trigger, state, style, animate, transition, Input} from '@angular/core';
import {AbstractComponent} from './abstract.class.component';


@Component({
	selector: 'help',
	animations: [

	trigger("animationBottomNav", [
		state("open", style({height:"30%"})),
		state("close", style({height: "0" })),
		transition("open <=> close", animate( "250ms" )),
		])
	],
	template: `<table class="help" style="    background-color: transparent!important;">
	<tr>
	<th colspan="2"><a href="{{linkOpen}}">Open with Map</a></th>
	</tr>
	<tr>
	<td> <a href="{{linkOpenTrain}}"><hr class="public"></a></td>
	<td> <a href="{{linkOpenTrain}}">Public</a></td>
	</tr>

	<tr>
	<td> <a href="{{linkOpenCar}}"><hr class="car"></a></td>
	<td> <a href="{{linkOpenCar}}">Car</a></td>
	</tr>
	</table>
	`,
	providers: []
})

export class Help extends AbstractComponent implements OnInit {
	linkOpen:string = 'https://maps.apple.com/';
	linkOpenTrain:string  = 'https://maps.apple.com/';
	linkOpenCar:string  = 'https://maps.apple.com/';

	ngOnInit(){
		this.state="close";
	}

	/**
	 * [updateSave get the lat and long from event and then generate a new link for direction service]
	 * @param {any} event [description]
	 */
	updateSave(event:any){
		this.linkOpen = 'https://maps.apple.com/'+event;
		this.linkOpenTrain = 'https://maps.apple.com/'+event +'&dirflg=r';
		this.linkOpenCar= 'https://maps.apple.com/'+event +'&dirflg=d';
	}
}
