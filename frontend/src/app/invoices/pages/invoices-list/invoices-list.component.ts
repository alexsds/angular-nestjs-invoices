import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceFormService } from 'src/app/shared/services/invoice-form.service';
import { Invoice } from '../../models/invoice';
import { Store } from '@ngrx/store';
import { selectInvoices } from '../../../store/invoice/invoice.selectors';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.sass'],
})
export class InvoicesListComponent {
  invoices$: Observable<Invoice[]>;

  constructor(private store: Store, private invoiceFormService: InvoiceFormService) {
    this.invoices$ = this.store.select(selectInvoices);
  }

  onClickNewInvoice(): void {
    this.invoiceFormService.toggleForm();
  }
}
