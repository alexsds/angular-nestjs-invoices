import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceFormService {
  private isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isOpen(): Observable<boolean> {
    return this.isOpen$.asObservable();
  }

  toggleForm(): void {
    this.isOpen$.next(!this.isOpen$.value);
  }
}
