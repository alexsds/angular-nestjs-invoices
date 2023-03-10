import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import { Invoice } from '../../invoices/models/invoice';
import { InvoiceStatus } from '../../invoices/emums/invoice-status.enum';

export const invoiceFeatureKey = 'invoice';

export interface InvoiceState {
  invoices: Invoice[];
}

export const initialState: InvoiceState = {
  invoices: [],
};

export const reducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoicesSuccess, (state, action) => {
    return {
      ...state,
      invoices: action.invoices,
    };
  }),
  on(InvoiceActions.createInvoiceSuccess, (state, action) => {
    const invoices = state.invoices.map((a) => {
      return { ...a };
    });
    invoices.push(action.invoice);
    return {
      ...state,
      invoices,
    };
  }),
  on(InvoiceActions.updateInvoiceSuccess, (state, action) => {
    const invoices = state.invoices.map((a) => {
      return { ...a };
    });
    const invoiceIndex = invoices.findIndex((item) => item.id === action.invoice.id);
    if (invoiceIndex !== -1) {
      invoices[invoiceIndex] = action.invoice;
    }
    return {
      ...state,
      invoices: invoices,
    };
  }),
  on(InvoiceActions.deleteInvoiceSuccess, (state, action) => {
    const invoices = state.invoices.filter((item) => item.id !== action.id);
    return {
      ...state,
      invoices: invoices,
    };
  }),
  on(InvoiceActions.markAsPaidInvoiceSuccess, (state, action) => {
    const invoices = state.invoices.map((a) => {
      return { ...a };
    });
    const invoiceIndex = invoices.findIndex((item) => item.id === action.id);
    if (invoiceIndex !== -1) {
      const invoiceToUpdate = invoices[invoiceIndex];
      invoices[invoiceIndex] = { ...invoiceToUpdate, status: InvoiceStatus.PAID };
    }
    return {
      ...state,
      invoices: invoices,
    };
  }),
);
