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
export const selectStatuses = createSelector(selectInvoiceState, (state) => state.statuses);
export const selectActiveFilter = createSelector(selectInvoiceState, (state) => state.activeFilter);
export const selectFilteredInvoices = createSelector(selectInvoiceState, (state) => state.filteredInvoices);
export const selectInvoicesWithFilters = createSelector(
  selectFilteredInvoices,
  selectStatuses,
  selectActiveFilter,
  (filteredInvoices, statuses, activeFilter) => {
    return {
      filteredInvoices,
      statuses,
      activeFilter,
    };
  },
);
