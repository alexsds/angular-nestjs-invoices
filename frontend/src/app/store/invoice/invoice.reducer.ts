import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import { Invoice } from '../../invoices/models/invoice';
import { InvoiceStatus } from '../../invoices/emums/invoice-status.enum';

export const invoiceFeatureKey = 'invoice';

export interface InvoiceState {
  invoices: Invoice[];
  activeFilter: InvoiceStatus | undefined;
  filteredInvoices: Invoice[];
  statuses: Set<InvoiceStatus>;
}

export const initialState: InvoiceState = {
  invoices: [],
  activeFilter: undefined,
  filteredInvoices: [],
  statuses: new Set(),
};

export const reducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoicesSuccess, (state, action) => {
    const statuses = new Set(action.invoices.map((item) => item.status));
    return {
      ...state,
      statuses: statuses,
      invoices: action.invoices,
      filteredInvoices: action.invoices,
    };
  }),
  on(InvoiceActions.createInvoiceSuccess, (state, action) => {
    const invoices = state.invoices.map((a) => {
      return { ...a };
    });
    invoices.push(action.invoice);
    const statuses = new Set(invoices.map((item) => item.status));
    return {
      ...state,
      invoices,
      statuses: statuses,
      activeFilter: undefined,
      filteredInvoices: invoices,
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
    const statuses = new Set(invoices.map((item) => item.status));
    return {
      ...state,
      invoices,
      statuses
    };
  }),
  on(InvoiceActions.deleteInvoiceSuccess, (state, action) => {
    const invoices = state.invoices.filter((item) => item.id !== action.id);
    const statuses = new Set(invoices.map((item) => item.status));
    return {
      ...state,
      invoices,
      statuses,
      activeFilter: undefined,
      filteredInvoices: invoices,
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
    const statuses = new Set(invoices.map((item) => item.status));
    return {
      ...state,
      invoices,
      statuses,
    };
  }),
  on(InvoiceActions.filterInvoiceByStatus, (state, action) => {
    let invoices = state.invoices.map((a) => {
      return { ...a };
    });
    invoices = invoices.filter((item) => item.status === action.status);
    return {
      ...state,
      activeFilter: action.status,
      filteredInvoices: invoices,
    };
  }),
  on(InvoiceActions.clearInvoiceFilter, (state) => {
    const invoices = state.invoices.map((a) => {
      return { ...a };
    });
    return {
      ...state,
      activeFilter: undefined,
      filteredInvoices: invoices,
    };
  }),
);
