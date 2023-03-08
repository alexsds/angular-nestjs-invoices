import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesService } from './services/invoices.service';

@NgModule({
  declarations: [
    InvoicesListComponent
  ],
  providers: [
    InvoicesService,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    InvoicesRoutingModule,
  ]
})
export class InvoicesModule { }
