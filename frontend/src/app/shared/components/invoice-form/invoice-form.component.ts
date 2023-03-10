import { Component, OnInit } from '@angular/core';
import { InvoiceFormService } from '../../services/invoice-form.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.sass'],
})
export class InvoiceFormComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder, private invoiceFormService: InvoiceFormService) {}

  ngOnInit(): void {
    this.createForm();
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

  onClickOutsideForm(): void {
    this.invoiceFormService.toggleForm();
  }

  onClickDiscard(): void {
    this.invoiceFormService.toggleForm();
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
    this.addItem();
  }
}
