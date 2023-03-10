import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceFormService } from 'src/app/shared/services/invoice-form.service';
import { Invoice } from '../../models/invoice';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.sass'],
})
export class InvoicesListComponent {
  invoices$: Observable<Invoice[]>;

  constructor(private invoicesService: InvoicesService, private invoiceFormService: InvoiceFormService) {
    this.invoices$ = this.invoicesService.getInvoices();
  }

  onClickNewInvoice(): void {
    this.invoiceFormService.toggleForm();
  }
}
