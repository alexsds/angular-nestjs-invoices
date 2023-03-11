import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InvoiceFormService } from 'src/app/shared/services/invoice-form.service';
import { Invoice } from '../../models/invoice';
import { selectInvoicesWithFilters } from '../../../store/invoice/invoice.selectors';
import { InvoiceStatus } from '../../emums/invoice-status.enum';
import { clearInvoiceFilter, filterInvoiceByStatus } from '../../../store/invoice/invoice.actions';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.sass'],
})
export class InvoicesListComponent implements OnInit {
  invoices: Invoice[] = [];
  statuses: Set<InvoiceStatus> = new Set<InvoiceStatus>();
  activeFilter: InvoiceStatus | undefined;

  constructor(private store: Store, private invoiceFormService: InvoiceFormService) {}

  ngOnInit(): void {
    this.store.select(selectInvoicesWithFilters).subscribe(({ filteredInvoices, statuses, activeFilter }) => {
      this.invoices = filteredInvoices;
      this.statuses = statuses;
      this.activeFilter = activeFilter;
    });
  }

  onClickNewInvoice(): void {
    this.invoiceFormService.toggleForm();
  }

  onClickFilterItem(status: InvoiceStatus): void {
    this.store.dispatch(filterInvoiceByStatus({ status }));
  }

  onClickClearFilterAction(): void {
    this.store.dispatch(clearInvoiceFilter());
  }
}
