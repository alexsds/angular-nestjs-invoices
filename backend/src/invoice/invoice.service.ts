import { Injectable } from '@nestjs/common';
import { data } from './constants/data';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceStatus } from './emums/invoice-status.enum';

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

    invoice.total = 0;
    invoice.items.forEach((item) => {
      const totalItemPrice = item.price * item.quantity;
      const total = Number(parseFloat(String(totalItemPrice)).toFixed(2));
      invoice.total = invoice.total + total;
    });

    this.invoices.set(id, invoice);
    return { id };
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
    return `This action updates a #${id} invoice`;
  }

  remove(id: string) {
    this.invoices.delete(id);
  }

  reset(): void {
    this.initInvoices();
  }

  clean(): void {
    this.invoices = new Map<string, Invoice>();
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
    this.clean();
    data.forEach((item) => {
      this.invoices.set(item.id, item as Invoice);
    });
  }
}
