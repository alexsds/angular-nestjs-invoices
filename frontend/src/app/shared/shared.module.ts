import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DatepickerCustomHeaderComponent } from './components/datepicker-custom-header/datepicker-custom-header.component';

@NgModule({
  declarations: [NavBarComponent, InvoiceFormComponent, ConfirmationModalComponent, DatepickerCustomHeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  exports: [NavBarComponent, InvoiceFormComponent, ConfirmationModalComponent],
})
export class SharedModule {}
