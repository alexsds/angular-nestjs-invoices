import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../invoices/models/invoice';
import { InvoiceStatus } from '../../invoices/emums/invoice-status.enum';

export const loadInvoices = createAction('[Invoice] Load');
export const loadInvoicesSuccess = createAction('[Invoice] Load Success', props<{ invoices: Invoice[] }>());
export const loadInvoicesFailure = createAction('[Invoice] Load Failure', props<{ error: any }>());

export const deleteInvoice = createAction('[Invoice] Delete', props<{ id: string }>());
export const deleteInvoiceSuccess = createAction('[Invoice] Delete Success', props<{ id: string }>());
export const deleteInvoiceFailure = createAction('[Invoice] Delete Failure', props<{ error: any }>());

export const markAsPaidInvoice = createAction('[Invoice] Mark As Paid', props<{ id: string }>());
export const markAsPaidInvoiceSuccess = createAction('[Invoice] Mark As Paid Success', props<{ id: string }>());
export const markAsPaidInvoiceFailure = createAction('[Invoice] Mark As Paid Failure', props<{ error: any }>());

export const updateInvoice = createAction('[Invoice] Update', props<{ id: string; invoice: Invoice }>());
export const updateInvoiceSuccess = createAction('[Invoice] Update Success', props<{ invoice: Invoice }>());
export const updateInvoiceFailure = createAction('[Invoice] Update Failure', props<{ error: any }>());

export const createInvoice = createAction('[Invoice] Create', props<{ invoice: Invoice; isDraft: boolean }>());
export const createInvoiceSuccess = createAction('[Invoice] Create Success', props<{ invoice: Invoice }>());
export const createInvoiceFailure = createAction('[Invoice] Create Failure', props<{ error: any }>());

export const filterInvoiceByStatus = createAction('[Invoice] Filter By Status', props<{ status: InvoiceStatus }>());
export const clearInvoiceFilter = createAction('[Invoice] Clear Filter');
