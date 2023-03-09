import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceFormService } from 'src/app/shared/services/invoice-form.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Invoice } from '../../models/invoice';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoices-detailed',
  templateUrl: './invoices-detailed.component.html',
  styleUrls: ['./invoices-detailed.component.sass']
})
export class InvoicesDetailedComponent {
  invoice$: Observable<Invoice>

  constructor(
    private invoicesService: InvoicesService,
    private invoiceFormService: InvoiceFormService,
    private modalService: ModalService,
  ) {
    this.invoice$ = this.invoicesService.getOneById("1");
  }

  onClickEditAction(): void {
    this.invoiceFormService.toggleForm();
  }

  onClickDeleteAction(): void {
    this.modalService.open();
  }
}
