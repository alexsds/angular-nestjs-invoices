import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { InvoiceFormService } from 'src/app/shared/services/invoice-form.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Invoice } from '../../models/invoice';
import { InvoiceStatus } from '../../emums/invoice-status.enum';
import { selectInvoiceById } from '../../../store/invoice/invoice.selectors';
import { deleteInvoice, markAsPaidInvoice } from '../../../store/invoice/invoice.actions';

@UntilDestroy()
@Component({
  selector: 'app-invoices-detailed',
  templateUrl: './invoices-detailed.component.html',
  styleUrls: ['./invoices-detailed.component.sass'],
})
export class InvoicesDetailedComponent {
  InvoiceStatus = InvoiceStatus;
  invoiceId: string;
  invoice$: Observable<Invoice>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private invoiceFormService: InvoiceFormService,
    private modalService: ModalService,
  ) {
    this.invoiceId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.invoice$ = this.store.select(selectInvoiceById(this.invoiceId));
  }

  onClickEditAction(): void {
    this.invoiceFormService.toggleForm(this.invoiceId);
  }

  onClickDeleteAction(): void {
    this.modalService
      .open({ id: this.invoiceId })
      .pipe(untilDestroyed(this))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.dispatch(deleteInvoice({ id: this.invoiceId }));
        }
      });
  }

  onClickMarkAsPaidAction(): void {
    this.store.dispatch(markAsPaidInvoice({ id: this.invoiceId }));
  }
}
