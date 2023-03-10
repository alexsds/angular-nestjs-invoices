import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';
import { InvoiceCreateResponse } from '../models/invoice-create-response';

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

  create(invoice: Invoice, isDraft: boolean): Observable<InvoiceCreateResponse> {
    if (environment.mock) {
      return this.http.post<InvoiceCreateResponse>(environment.apiUrl.invoices.create, { invoice, isDraft });
    }

    return this.http.post<InvoiceCreateResponse>(environment.apiUrl.invoices.create, { invoice, isDraft });
  }

  update(id: string, invoice: Invoice): Observable<Invoice> {
    if (environment.mock) {
      return this.http.put<Invoice>(`${environment.apiUrl.invoices.one}/${id}`, { invoice });
    }

    return this.http.put<Invoice>(`${environment.apiUrl.invoices.one}/${id}`, { invoice });
  }

  remove(id: string): Observable<void> {
    if (environment.mock) {
      return this.http.get<void>(environment.apiUrl.invoices.one);
    }

    return this.http.delete<void>(`${environment.apiUrl.invoices.one}/${id}`);
  }

  markAsPaid(id: string): Observable<Invoice> {
    if (environment.mock) {
      return this.http.get<Invoice>(environment.apiUrl.invoices.markAsPaid);
    }

    return this.http.post<Invoice>(`${environment.apiUrl.invoices.markAsPaid}/${id}`, {});
  }
}
