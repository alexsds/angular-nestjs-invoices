import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInvoice from './invoice.reducer';
import { Invoice } from '../../invoices/models/invoice';

export const selectInvoiceState = createFeatureSelector<fromInvoice.InvoiceState>(fromInvoice.invoiceFeatureKey);
export const selectInvoices = createSelector(selectInvoiceState, (state) => state.invoices);
export const selectInvoiceById = (id: string) =>
  createSelector(selectInvoices, (invoices) => {
    return invoices.find((item) => {
      return item.id === id;
    }) as Invoice;
  });
