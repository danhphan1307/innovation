import { Component, ViewChild, Output, EventEmitter, } from '@angular/core';
import { Http, Response, Headers,URLSearchParams, RequestOptions } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import {Observable} from 'rxjs/Rx';

@Component({
	selector: 'custom-bootstrap',
	template: `

	<div bsModal #customModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="customModalLabel" aria-hidden="true">
		<div class="vertical-alignment-helper modal-dialog modal-lg">
			<div class="modal-dialog vertical-align-center">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" (click)="hideModal()" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="title">Parking Spot</h4>
					</div>
					<div class="modal-body" id="modal-body">
						<p> We found your nearest parking spot<br>
						Location: {{content}}
						</p>
					</div>
					<div class="modal-footer" id="modal-footer">
						<button type="button" class="btn btn-danger" id="btn-close" (click)="hideModal()">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>`,
	providers: []
})
export class CustomComponent {
	content:string;

	constructor(private http: Http){}

	value:number = 0;

	@ViewChild('customModal')
	customModal:ModalDirective;

	/**
	 * [showModal show payment panel]
	 * @param {string} _content [description]
	 */
	showModal(_content:string) {
		this.content = _content;
		this.customModal.show();
	}

	/**
	 * [hideModal hide payment panel]
	 */
	hideModal() {
		this.customModal.hide();
	}
}