import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import * as fromInvoice from './store/invoice/invoice.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InvoiceEffects } from './store/invoice/invoice.effects';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(fromInvoice.invoiceFeatureKey, fromInvoice.reducer),
    EffectsModule.forRoot([InvoiceEffects]),
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'GBP' },
    { provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
