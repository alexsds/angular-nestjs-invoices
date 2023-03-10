import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesService } from './services/invoices.service';
import { InvoicesDetailedComponent } from './pages/invoices-detailed/invoices-detailed.component';
import { InvoiceStatusComponent } from './components/invoice-status/invoice-status.component';

@NgModule({
  declarations: [InvoicesListComponent, InvoicesDetailedComponent, InvoiceStatusComponent],
  providers: [InvoicesService],
  imports: [CommonModule, HttpClientModule, InvoicesRoutingModule],
})
export class InvoicesModule {}
