import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(environment.apiUrl.invoices.list);
  }

  getOneById(id: string): Observable<Invoice> {
    if (environment.mock) {
      return this.http.get<Invoice>(environment.apiUrl.invoices.one);
    }

    return this.http.get<Invoice>(`${environment.apiUrl.invoices.one}/${id}`);
  }

  remove(id: string): Observable<void> {
    if (environment.mock) {
      return this.http.get<void>(environment.apiUrl.invoices.one);
    }

    return this.http.delete<void>(`${environment.apiUrl.invoices.one}/${id}`);
  }
}
