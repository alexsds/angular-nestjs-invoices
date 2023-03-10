import { Injectable } from '@nestjs/common';
import { invoices } from './constants/data';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoiceService {
  private invoices = invoices;

  create(createInvoiceDto: CreateInvoiceDto) {
    return 'This action adds a new invoice';
  }

  findAll() {
    return this.invoices;
  }

  findOne(id: string) {
    return this.invoices.find((invoice) => invoice.id === id);
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: string) {
    const invoices = this.removeObjectWithId(this.invoices, id);
    this.invoices = invoices;
  }

  reset(): void {
    this.invoices = invoices;
  }

  clean(): void {
    this.invoices = [];
  }

  private removeObjectWithId(arr, id) {
    return arr.filter((obj) => obj.id !== id);
  }
}
