export const environment = {
  production: true,
  mock: false,
  apiUrl: {
    invoices: {
      list: '/mock/responses/invoices/list.json',
      one: '/mock/responses/invoices/one.json',
      create: '/mock/responses/invoices/one.json',
      update: '/mock/responses/invoices/one.json',
      markAsPaid: '/mock/responses/invoices/one.json',
      remove: '/mock/responses/invoices/one.json',
    },
  },
};
