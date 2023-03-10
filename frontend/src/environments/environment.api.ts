export const environment = {
  production: false,
  mock: false,
  apiUrl: {
    invoices: {
      list: 'http://localhost:3000/invoice',
      one: 'http://localhost:3000/invoice',
      create: 'http://localhost:3000/invoice',
      update: 'http://localhost:3000/invoice',
      markAsPaid: 'http://localhost:3000/invoice/mark-as-paid',
      remove: 'http://localhost:3000/invoice',
    },
  },
};
