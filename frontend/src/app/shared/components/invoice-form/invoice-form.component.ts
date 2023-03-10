import { Component } from '@angular/core';
import { InvoiceFormService } from '../../services/invoice-form.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.sass'],
})
export class InvoiceFormComponent {
  constructor(private invoiceFormService: InvoiceFormService) {}

  onClickOutsideForm() {
    this.invoiceFormService.toggleForm();
  }
}
