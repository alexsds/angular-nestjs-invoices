import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  declarations: [
    InvoicesListComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
