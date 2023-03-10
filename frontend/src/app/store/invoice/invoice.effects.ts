import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as InvoiceActions from './invoice.actions';
import { InvoicesService } from '../../invoices/services/invoices.service';
import { InvoiceFormService } from '../../shared/services/invoice-form.service';

@Injectable()
export class InvoiceEffects {
  loadInvoices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      concatMap(() =>
        this.invoicesService.getInvoices().pipe(
          map((invoices) => InvoiceActions.loadInvoicesSuccess({ invoices })),
          catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error }))),
        ),
      ),
    );
  });

  createInvoice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvoiceActions.createInvoice),
      concatMap((action) =>
        this.invoicesService.create(action.invoice, action.isDraft).pipe(
          map((invoice) => InvoiceActions.createInvoiceSuccess({ invoice })),
          tap(() => this.invoiceFormService.toggleForm()),
          catchError((error) => of(InvoiceActions.createInvoiceFailure({ error }))),
        ),
      ),
    );
  });

  updateInvoice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvoiceActions.updateInvoice),
      concatMap((action) =>
        this.invoicesService.update(action.id, action.invoice).pipe(
          map((invoice) => InvoiceActions.updateInvoiceSuccess({ invoice })),
          tap(() => this.invoiceFormService.toggleForm()),
          catchError((error) => of(InvoiceActions.updateInvoiceFailure({ error }))),
        ),
      ),
    );
  });

  deleteInvoices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvoiceActions.deleteInvoice),
      concatMap((action) =>
        this.invoicesService.remove(action.id).pipe(
          map(() => InvoiceActions.deleteInvoiceSuccess({ id: action.id })),
          tap(() => this.router.navigate(['/'])),
          catchError((error) => of(InvoiceActions.deleteInvoiceFailure({ error }))),
        ),
      ),
    );
  });

  markAsPaidInvoice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvoiceActions.markAsPaidInvoice),
      concatMap((action) =>
        this.invoicesService.markAsPaid(action.id).pipe(
          map(() => InvoiceActions.markAsPaidInvoiceSuccess({ id: action.id })),
          catchError((error) => of(InvoiceActions.markAsPaidInvoiceFailure({ error }))),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private invoicesService: InvoicesService,
    private router: Router,
    private invoiceFormService: InvoiceFormService,
  ) {}
}
