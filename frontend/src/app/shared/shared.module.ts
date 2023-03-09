import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

@NgModule({
  declarations: [
    NavBarComponent,
    InvoiceFormComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NavBarComponent,
    InvoiceFormComponent,
  ]
})
export class SharedModule { }
