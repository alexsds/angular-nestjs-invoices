import { Component, Input } from '@angular/core';
import { InvoiceStatus } from 'src/app/emums/invoice-status.enum';

@Component({
  selector: 'app-invoice-status',
  templateUrl: './invoice-status.component.html',
  styleUrls: ['./invoice-status.component.sass']
})
export class InvoiceStatusComponent {
  @Input() status: InvoiceStatus = InvoiceStatus.DRAFT;

  InvoiceStatus = InvoiceStatus;
}
