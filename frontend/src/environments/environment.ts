export const environment = {
  production: true,
  mock: false,
  apiUrl: {
    invoices: {
      list: 'https://angular-nestjs-invoices-api.vercel.app/invoice',
      one: 'https://angular-nestjs-invoices-api.vercel.app/invoice',
      create: 'https://angular-nestjs-invoices-api.vercel.app/invoice',
      update: 'https://angular-nestjs-invoices-api.vercel.app/invoice',
      markAsPaid: 'https://angular-nestjs-invoices-api.vercel.app/invoice/mark-as-paid',
      remove: 'https://angular-nestjs-invoices-api.vercel.app/invoice',
    },
  },
};
