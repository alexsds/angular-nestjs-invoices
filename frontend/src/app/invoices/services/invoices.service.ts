import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';

@Injectable()
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(environment.apiUrl.invoices.list);
  }

  getOneById(id: string): Observable<Invoice> {
    if (environment.mock) {
      return this.http.get<Invoice>(environment.apiUrl.invoices.one);
    }

    return this.http.get<Invoice>(`${environment.apiUrl.invoices.one}/${id}`);
  }
}
