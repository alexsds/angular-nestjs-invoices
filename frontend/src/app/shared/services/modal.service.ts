import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ModalData } from '../models/modal-data';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private data: ModalData<object> = {};
  private isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private result$: Subject<boolean> = new Subject();

  isOpen(): Observable<boolean> {
    return this.isOpen$.asObservable();
  }

  getData<T>(): ModalData<T> {
    return this.data;
  }

  open<T>(data: ModalData<T>): Observable<boolean> {
    this.data = data;
    this.isOpen$.next(true);
    return this.result$.asObservable();
  }

  close(result: boolean): void {
    this.result$.next(result);
    this.isOpen$.next(false);
  }
}
