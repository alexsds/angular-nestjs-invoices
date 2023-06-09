import { Injectable } from '@nestjs/common';
import { data } from './constants/data';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceStatus } from './emums/invoice-status.enum';
import { PaymentTerms } from './emums/payment-terms.enum';

@Injectable()
export class InvoiceService {
  private invoices: Map<string, Invoice> = new Map<string, Invoice>();

  constructor() {
    this.initInvoices();
  }

  create(createInvoiceDto: CreateInvoiceDto) {
    const id = this.generateNextId();
    const invoice = createInvoiceDto.invoice;
    invoice.id = id;
    if (createInvoiceDto.isDraft) {
      invoice.status = InvoiceStatus.DRAFT;
    }
    if (!createInvoiceDto.isDraft) {
      invoice.status = InvoiceStatus.PENDING;
    }
    invoice.total = this.getTotal(invoice);
    invoice.paymentDue = this.getPaymentDue(invoice);
    this.invoices.set(id, invoice);
    return invoice;
  }

  findAll() {
    const invoices = [];
    this.invoices.forEach((item) => {
      invoices.push(item);
    });
    return invoices;
  }

  findOne(id: string) {
    return this.invoices.get(id);
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = this.findOne(id);
    if (invoice) {
      const updatedInvoice = { ...invoice, ...updateInvoiceDto.invoice };
      updatedInvoice.status = InvoiceStatus.PENDING;
      updatedInvoice.total = this.getTotal(updatedInvoice);
      updatedInvoice.paymentDue = this.getPaymentDue(updatedInvoice);
      this.invoices.set(id, updatedInvoice);
      return updatedInvoice;
    }
  }

  remove(id: string) {
    this.invoices.delete(id);
  }

  markAsPaid(id: string) {
    const invoice = this.findOne(id);
    if (invoice && invoice.status === InvoiceStatus.PENDING) {
      invoice.status = InvoiceStatus.PAID;
      this.invoices.set(id, invoice);
      return invoice;
    }
  }

  reset(): void {
    this.initInvoices();
  }

  clean(): void {
    this.invoices.clear();
  }

  private getTotal(invoice: Invoice): number {
    let total = 0;
    invoice.items.forEach((item) => {
      const totalItemPrice = item.price * item.quantity;
      const totalPrice = Number(parseFloat(String(totalItemPrice)).toFixed(2));
      total = total + totalPrice;
    });
    return total;
  }

  private getPrefix(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  private generateNextId() {
    const prefix = this.getPrefix(2);
    const number = Math.random().toString().slice(2, 6);
    return prefix + number;
  }

  private initInvoices(): void {
    this.invoices.clear();
    data.forEach((item) => {
      this.invoices.set(item.id, { ...(item as Invoice) });
    });
  }

  private getPaymentDue(invoice: Invoice): string {
    if (!invoice.createdAt) {
      invoice.createdAt = new Date().toISOString().split('T')[0];
    } else {
      invoice.createdAt = new Date(invoice.createdAt).toISOString().split('T')[0];
    }
    if (!invoice.paymentDue) {
      invoice.paymentTerms = PaymentTerms.MOUTH;
    }
    const createdAt = new Date(invoice.createdAt);
    createdAt.setDate(createdAt.getDate() + invoice.paymentTerms);
    return createdAt.toISOString().split('T')[0];
  }
}
