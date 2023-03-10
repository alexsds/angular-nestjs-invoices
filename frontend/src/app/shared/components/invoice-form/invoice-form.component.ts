import { Component, OnInit } from '@angular/core';
import { InvoiceFormService } from '../../services/invoice-form.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../../../invoices/models/invoice';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { createInvoice, updateInvoice } from '../../../store/invoice/invoice.actions';
import { selectInvoiceById } from '../../../store/invoice/invoice.selectors';
import { DatepickerCustomHeaderComponent } from '../datepicker-custom-header/datepicker-custom-header.component';

type Mode = 'edit' | 'new';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.sass'],
})
export class InvoiceFormComponent implements OnInit {
  customHeader = DatepickerCustomHeaderComponent;
  mode: Mode = 'new';
  invoice: Invoice | undefined;
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder, private invoiceFormService: InvoiceFormService, private store: Store) {}

  ngOnInit(): void {
    this.createForm();
    this.setValues();
  }

  get items(): FormArray {
    return this.form?.get('items') as FormArray;
  }

  getSenderAddressInput(key: string): FormControl {
    const group = this.form?.get('senderAddress') as FormGroup;
    return group.get(key) as FormControl;
  }

  getClientAddressInput(key: string): FormControl {
    const group = this.form?.get('clientAddress') as FormGroup;
    return group.get(key) as FormControl;
  }

  getInput(key: string): FormControl {
    return this.form?.get(key) as FormControl;
  }

  getItemInput(index: number, key: string): FormControl {
    return this.items.at(index).get(key) as FormControl;
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
    if (this.items.length === 1) return;
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

  onClickSaveChanges(): void {
    this.markAllAsRequired();
    this.form?.markAllAsTouched();

    if (this.form?.valid) {
      const values = this.form?.value;
      const id = this.invoice?.id as string;
      this.store.dispatch(updateInvoice({ id, invoice: values }));
    }
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
    this.store.dispatch(createInvoice({ invoice: this.form?.value, isDraft: true }));
  }

  onClickSaveAndSend(): void {
    this.markAllAsRequired();
    this.form?.markAllAsTouched();
    if (this.form?.valid) {
      this.store.dispatch(createInvoice({ invoice: this.form?.value, isDraft: false }));
    }
  }

  private markAllAsRequired(): void {
    for (const field in this.form?.controls) {
      const control = this.form?.get(field);
      if (control instanceof FormGroup) {
        for (const formGroupControl in control.controls) {
          control.get(formGroupControl)?.setValidators(Validators.required);
          control.get(formGroupControl)?.updateValueAndValidity();
        }
      }
      if (control instanceof FormArray) {
        for (const index in control.controls) {
          const formArrayControls = this.items.at(+index) as FormGroup;
          for (const formArrayControl in formArrayControls.controls) {
            formArrayControls.get(formArrayControl)?.setValidators(Validators.required);
            formArrayControls.get(formArrayControl)?.updateValueAndValidity();
          }
        }
      }
      if (control instanceof FormControl) {
        control.setValidators(Validators.required);
        control.updateValueAndValidity();
      }
    }
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
      this.store
        .select(selectInvoiceById(invoiceId))
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
