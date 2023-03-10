import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceFormService {
  private invoiceId: string | undefined;
  private isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isOpen(): Observable<boolean> {
    return this.isOpen$.asObservable();
  }

  getInvoiceId(): string | undefined {
    return this.invoiceId;
  }

  toggleForm(invoiceId?: string): void {
    this.invoiceId = invoiceId;
    this.isOpen$.next(!this.isOpen$.value);
  }
}
