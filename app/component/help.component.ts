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
	template: `<table class="help">
	<tr>
	<td> <hr class="public"></td>
	<td> Public</td>
	</tr>

	<tr>
	<td> <hr class="car"></td>
	<td> Car</td>
	</tr>
	</table>
	`,
	providers: []
})

export class Help extends AbstractComponent implements OnInit {

	ngOnInit(){
		this.state="close";
	}

	updateSave(event:any){

	}
}
