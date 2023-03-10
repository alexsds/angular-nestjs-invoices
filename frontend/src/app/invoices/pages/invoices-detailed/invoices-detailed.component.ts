import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, take } from 'rxjs';
import { InvoiceFormService } from 'src/app/shared/services/invoice-form.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Invoice } from '../../models/invoice';
import { InvoicesService } from '../../services/invoices.service';
import { InvoiceStatus } from '../../emums/invoice-status.enum';

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
    private invoicesService: InvoicesService,
    private invoiceFormService: InvoiceFormService,
    private modalService: ModalService,
    private router: Router,
  ) {
    this.invoiceId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.invoice$ = this.invoicesService.getOneById(this.invoiceId);
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
          this.invoicesService
            .remove(this.invoiceId)
            .pipe(take(1))
            .subscribe(() => {
              this.router.navigate(['../']);
            });
        }
      });
  }
}
