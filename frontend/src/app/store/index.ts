import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { InvoiceState, reducer } from './invoice/invoice.reducer';

export interface State {
  invoiceFeatureKey: InvoiceState;
}

export const reducers: ActionReducerMap<State> = {
  invoiceFeatureKey: reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
