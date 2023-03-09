import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    NavBarComponent,
    InvoiceFormComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NavBarComponent,
    InvoiceFormComponent,
    ConfirmationModalComponent,
  ]
})
export class SharedModule { }