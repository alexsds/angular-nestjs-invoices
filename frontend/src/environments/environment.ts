export const environment = {
  production: true,
  mock: false,
  apiUrl: {
    invoices: {
      list: 'https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice',
      one: 'https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice',
      create: 'https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice',
      update: 'https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice',
      markAsPaid: 'https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice/mark-as-paid',
      remove: 'https://angular-nestjs-invoices-backend-8tmb3.ondigitalocean.app/invoice',
    },
  },
};
