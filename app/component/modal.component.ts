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
	<div class="modal-header">
	<button type="button" class="close" (click)="hideLgModal()" aria-label="Close">
	<span aria-hidden="true">&times;</span>
	</button>
	<h4 class="modal-title" id="title">Comfirmation</h4>
	</div>
	<div class="modal-body" id="modal-body">
	<div class="input-group">
	<span class="input-group-addon glyphicon glyphicon-credit-card" id="sizing-addon2"></span>
	<input type="text" class="form-control" placeholder="License plate" aria-describedby="sizing-addon2" id="input1">
	</div>
	<br>
	<div class="input-group">
	<span class="input-group-addon glyphicon glyphicon glyphicon-retweet" id="sizing-addon3"></span>
	<input type="text" class="form-control" placeholder="License plate" aria-describedby="sizing-addon3" id="input2">
	</div>
	<br>
	This spot will cost you {{value}} €/h <br>
	Press Accept to confirm
	<br><br>
	<div id="error-log" class="alert alert-danger" style="display:none"></div>
	<div id="success-log" class="alert alert-success" style="display:none"></div>
	</div>
	<div class="modal-footer" id="modal-footer">
	<button type="submit" class="btn btn-success" id="btn-success" (click) = "accept()">Accept</button>
	<button type="button" class="btn btn-danger" id="btn-danger" (click)="hideLgModal()">Cancel</button>
	</div>
	</div>

	</div>	</div>
	</div>`,
	providers: []
})
export class ModalComponent {
	result:any; 
	private ticketURL = 'https://fabulous-backend-hsl-parking.herokuapp.com/api/ticket';

	constructor(private http: Http){

	}

	value:number = 0;

	@ViewChild('lgModal') public lgModal:ModalDirective;

	@Output()
	resultUpdated:EventEmitter<any> = new EventEmitter<any>();

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
			return body[0].row || { }
		});
		
	}

	showLgModal(_param:number) {
		document.getElementById('input1').className="form-control";
		document.getElementById('input2').className="form-control";
		document.getElementById("error-log").style.display = "none";
		document.getElementById("success-log").style.display = "none";
		document.getElementById("btn-success").style.visibility = "visible";
		document.getElementById("btn-danger").style.visibility = "visible";
		document.getElementById("title").innerText= "Confirmation";

		this.value=_param;
		this.lgModal.show();
	}

	accept(){
		if((<HTMLInputElement>document.getElementById('input1')).value!=(<HTMLInputElement>document.getElementById('input2')).value||(<HTMLInputElement>document.getElementById('input1')).value=='' || (<HTMLInputElement>document.getElementById('input2')).value ==''){
			document.getElementById('input1').className="form-control has-error";
			document.getElementById('input2').className="form-control has-error";
			document.getElementById('error-log').innerText="Please check the information again";
			document.getElementById("error-log").style.display = "block";
		}else {
			document.getElementById('input1').className="form-control has-success";
			document.getElementById('input2').className="form-control has-success";
			document.getElementById("error-log").style.display = "none";
			this.getTicket((<HTMLInputElement>document.getElementById('input1')).value).subscribe( (data:any) => {
				if(data!="Success false"){
					//this.lgModal.hide();
					console.log(data);
					document.getElementById("btn-success").style.visibility = "hidden";
					document.getElementById("btn-danger").style.visibility = "hidden";
					document.getElementById("success-log").style.display = "block";
					var content = "Your ticket number is: " + data;
					document.getElementById('success-log').innerText= content;
					document.getElementById("title").innerText= "Thank you";
					this.resultUpdated.emit(data);
					return true;
				}
				else {
					document.getElementById("error-log").style.display = "block";
					document.getElementById('error-log').innerText="Cannot get the ticket. Please try again.";
				}
			});
			
		}
		
	}

	hideLgModal() {
		this.lgModal.hide();
		this.resultUpdated.emit(false);
		return false;
	}
}