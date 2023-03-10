import { Address } from './address.entity';
import { InvoiceStatus } from '../emums/invoice-status.enum';
import { InvoiceItem } from './invoice-item.entity';

export class Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[] = [];
  total: number;
}
