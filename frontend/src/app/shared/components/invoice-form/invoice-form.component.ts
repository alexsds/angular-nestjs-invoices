import { Component, OnInit } from '@angular/core';
import { InvoiceFormService } from '../../services/invoice-form.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InvoicesService } from '../../../invoices/services/invoices.service';
import { Invoice } from '../../../invoices/models/invoice';
import { take } from 'rxjs';

type Mode = 'edit' | 'new';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.sass'],
})
export class InvoiceFormComponent implements OnInit {
  mode: Mode = 'new';
  invoice: Invoice | undefined;
  form: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private invoiceFormService: InvoiceFormService,
    private invoicesService: InvoicesService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setValues();
  }

  get items() {
    return this.form?.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(
      this.fb.group({
        name: [''],
        quantity: [''],
        price: [''],
        total: [''],
      }),
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  getTotal(index: number): string {
    const item = this.items.at(index);
    const quantity = item.get('quantity') ? item.get('quantity')?.value : 0;
    const price = item.get('price') ? item.get('price')?.value : 0;
    const totalPrice = quantity * price;
    const total = parseFloat(String(totalPrice)).toFixed(2);
    item.get('total')?.setValue(total);
    return total;
  }

  onSubmit(): void {
    const values = this.form?.value;
    console.log('values', values);
  }

  onClickCancel(): void {
    this.invoiceFormService.toggleForm();
  }

  onClickOutsideForm(): void {
    this.invoiceFormService.toggleForm();
  }

  onClickDiscard(): void {
    this.invoiceFormService.toggleForm();
  }

  onClickSaveAsDraft(): void {
    this.invoicesService
      .create(this.form?.value, true)
      .pipe(take(1))
      .subscribe(() => {
        this.invoiceFormService.toggleForm();
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      senderAddress: this.fb.group({
        street: [''],
        city: [''],
        postCode: [''],
        country: [''],
      }),
      clientName: [''],
      clientEmail: [''],
      clientAddress: this.fb.group({
        street: [''],
        city: [''],
        postCode: [''],
        country: [''],
      }),
      createdAt: [''],
      paymentTerms: [''],
      description: [''],
      items: this.fb.array([]),
    });
  }

  private setValues(): void {
    const invoiceId = this.invoiceFormService.getInvoiceId();
    if (invoiceId) {
      this.invoicesService
        .getOneById(invoiceId)
        .pipe(take(1))
        .subscribe((invoice) => {
          this.invoice = invoice;
          invoice.items.forEach(() => {
            this.addItem();
          });
          this.form?.patchValue(invoice);
          this.mode = 'edit';
        });
      return;
    }
    this.addItem();
  }
}
