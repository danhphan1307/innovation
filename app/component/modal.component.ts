import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

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
	<h4 class="modal-title">Comfirmation</h4>
	</div>
	<div class="modal-body">
	This spot will cost you {{value}} €/h <br>
	Press Accept to confirm
	</div>
	<div class="modal-footer">
	<button type="button" class="btn btn-success" (click) = "accept()">Accept</button>
	<button type="button" class="btn btn-danger" (click)="hideLgModal()">Cancel</button>
	</div>
	</div>

	</div>	</div>
	</div>`,
	providers: []
})
export class ModalComponent {
	value:number = 0;

	@ViewChild('lgModal') public lgModal:ModalDirective;
	@Output()
	resultUpdated:EventEmitter<any> = new EventEmitter<any>();

	showLgModal(_param:number) {
		this.value=_param;
		this.lgModal.show();
	}
	accept():boolean{
		this.lgModal.hide();
		this.resultUpdated.emit(true);
		return true;
	}

	hideLgModal() {
		this.lgModal.hide();
		this.resultUpdated.emit(false);
		return false;
	}
}