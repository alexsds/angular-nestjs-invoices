import { Invoice } from '../entities/invoice.entity';

export class CreateInvoiceDto {
  invoice: Invoice;
  isDraft: boolean;
}
