import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoices-detailed',
  templateUrl: './invoices-detailed.component.html',
  styleUrls: ['./invoices-detailed.component.sass']
})
export class InvoicesDetailedComponent {
  invoice$: Observable<Invoice>

  constructor(private invoicesService: InvoicesService) {
    this.invoice$ = this.invoicesService.getOneById("1");
  }
}
