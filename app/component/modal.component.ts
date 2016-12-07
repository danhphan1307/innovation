import { Component, ViewChild, Output, EventEmitter, } from '@angular/core';
import { Http, Response, Headers,URLSearchParams, RequestOptions } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import {Observable} from 'rxjs/Rx';

@Component({
	selector: 'modal-bootstrap',
	template: `

	<div bsModal #lgModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="vertical-alignment-helper modal-dialog modal-lg">
	<div class="modal-dialog vertical-align-center">
	<div class="modal-content">
	<div class="modal-body" id="modal-body">
	<h4 class="modal-title" id="title">Ticket Price: {{value}} €/h</h4><br>

	<i class="fa fa-car" aria-hidden="true"></i> <input type="text" placeholder="License plate" aria-describedby="sizing-addon2" id="input1" value ="ABC-789" ><br>
	<i class="fa fa-credit-card" aria-hidden="true"></i> <input type="text" placeholder="Card Number" aria-describedby="sizing-addon2" id="input2" value ="4242 4242 4242 4242"><br>
	<i class="fa fa-calendar-o" aria-hidden="true"></i> <input type="text" placeholder="MM/YY" aria-describedby="sizing-addon2" id="input3" value ="11/18" >
	<i class="fa fa-lock" aria-hidden="true"></i> <input type="text" placeholder="CVC" aria-describedby="sizing-addon2" id="input4" value ="111">
	<br>
	<img src="img/waiting-respond.gif" alt="loading" id="waiting-respond"/>
	<div id="error-log" class="alert alert-danger" style="display:none"></div>
	<div id="success-log" class="alert alert-success" style="display:none"></div>
	<div style="display:block;margin:0 auto;text-align:center;" *ngIf=!boughtTicket>
	<button type="submit" class="btn btn-success" id="btn-success" (click) = "accept()">Accept</button>
	<button type="button" class="btn btn-danger" id="btn-danger" (click)="hideLgModal()">Cancel</button>
	</div>
	<div style="display:block;margin:0 auto;text-align:center;" *ngIf=boughtTicket>
	<button type="button" class="btn btn-danger" id="btn-close" (click)="hideLgModal()">Close</button>
	</div>
	</div>
	</div>
	</div>
	</div>	
	</div>`,
	providers: []
})
export class ModalComponent {
	boughtTicket:boolean = false;
	result:any;
	value:number = 0;
	private ticketURL = 'https://fabulous-backend-hsl-parking.herokuapp.com/api/ticket';

	constructor(private http: Http){

	}

	@ViewChild('lgModal')
	lgModal:ModalDirective;

	@Output()
	resultUpdated:EventEmitter<any> = new EventEmitter<any>();


	/**
	 * [Get the ticket generate by server.]
	 * @param  {string} license [description]
	 * @return {any}            [description]
	 */
	 getTicket(license: string): any{
	 	let params: URLSearchParams = new URLSearchParams();
	 	let data = {
	 		"license": license
	 	}
	 	let body = JSON.stringify(data);
	 	let head = new Headers({
	 		'Content-Type': 'application/json'
	 	});

	 	return this.http.post(this.ticketURL, body, {headers : head})
	 	.map( (response) => {let body = response.json()
	 		return body['data'] || { }
	 	});
	 }

	/**
	 * [showLgModal reset the modal]
	 * @param {number} _param [description]
	 */
	 showLgModal(_param:number) {
	 	this.boughtTicket = false;
	 	document.getElementById("error-log").style.display = "none";
	 	document.getElementById("success-log").style.display = "none";
	 	document.getElementById("title").innerText= "Ticket Price: 4 €/h";
	 	document.getElementById("waiting-respond").style.height = '0';
	 	this.value=_param;
	 	this.lgModal.show();
	 }

	/**
	 * [hideLgModal hide the modal]
	 */
	 hideLgModal() {
	 	this.lgModal.hide();
	 	this.resultUpdated.emit(false);
	 	return false;
	 }

	/**
	 * [This function will check the input, handle the response from server
	*	and reset the form when being reopened]
	*/
	accept(){
		if((<HTMLInputElement>document.getElementById('input1')).value=='' || !(/\S/.test((<HTMLInputElement>document.getElementById('input1')).value))||!(/\S/.test((<HTMLInputElement>document.getElementById('input2')).value))||!(/\S/.test((<HTMLInputElement>document.getElementById('input3')).value))||!(/\S/.test((<HTMLInputElement>document.getElementById('input4')).value))){
			document.getElementById('error-log').innerText="Please check the license again";
			document.getElementById("error-log").style.display = "block";
		}else {

			document.getElementById("error-log").style.display = "none";
			document.getElementById("btn-success").style.visibility = "hidden";
			document.getElementById("btn-danger").style.visibility = "hidden";
			document.getElementById("waiting-respond").style.height = '100%';
			this.getTicket((<HTMLInputElement>document.getElementById('input1')).value).subscribe( (data:any) => {
				if(data!="Success false"){
					this.saveCard();
					this.boughtTicket = true;
					document.getElementById("waiting-respond").style.height = '0';
					document.getElementById("success-log").style.display = "block";
					var content = "Your ticket number is: <br>" + (data.ticket_code);
					document.getElementById('success-log').innerHTML= content;
					document.getElementById("title").innerText= "Ticket Information";
					document.getElementById("btn-close").style.visibility = "visible";
					localStorage.setItem('ticket',data.ticket_code);
					localStorage.setItem('date',data.time_stamp);
					this.resultUpdated.emit(data);
					return true;
				}
				else {
					document.getElementById("error-log").style.display = "block";
					document.getElementById('error-log').innerText="Cannot get the ticket. Please try again.";

					document.getElementById("btn-close").style.visibility = "visible";
				}
			});
		}
	}

	public saveCard() {
		localStorage.setItem("credit",((<HTMLInputElement>document.getElementById('input2')).value).replace(/\s+/g, ''));
		localStorage.setItem("year",(<HTMLInputElement>document.getElementById('input3')).value);
		localStorage.setItem("ccv",(<HTMLInputElement>document.getElementById('input4')).value);
	}
}