import { InvoiceStatus } from "src/app/emums/invoice-status.enum";

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  },
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  },
  items: [
    {
      name: string;
      quantity: number;
      price: number;
      total: number;
    }
  ],
  total: number;
}
