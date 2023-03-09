import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isOpen(): Observable<boolean> {
    return this.isOpen$.asObservable();
  }

  open(): void {
    this.isOpen$.next(true);
  }

  close(): void {
    this.isOpen$.next(false);
  }
}
