import { Component } from '@angular/core';
import { ModalData } from '../../models/modal-data';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.sass'],
})
export class ConfirmationModalComponent {
  data: ModalData<{ id: string }>;

  constructor(private modalService: ModalService) {
    this.data = this.modalService.getData<{ id: string }>();
  }

  onClickCancelAction(): void {
    this.modalService.close(false);
  }

  onClickDeleteAction(): void {
    this.modalService.close(true);
  }
}
