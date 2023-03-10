import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class InvoicesDetailedComponent implements OnInit {
  invoice$: Observable<Invoice>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoicesService: InvoicesService,
    private invoiceFormService: InvoiceFormService,
    private modalService: ModalService,
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.invoice$ = this.invoicesService.getOneById(id);
  }

  ngOnInit(): void {

  }

  onClickEditAction(): void {
    this.invoiceFormService.toggleForm();
  }

  onClickDeleteAction(): void {
    this.modalService.open();
  }
}
