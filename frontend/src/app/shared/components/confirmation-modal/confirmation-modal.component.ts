import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.sass']
})
export class ConfirmationModalComponent {
  constructor(private modalService: ModalService) { }

  onClickCancelAction(): void {
    this.modalService.close();
  }

  onClickDeleteAction(): void {
    this.modalService.close();
  }
}
