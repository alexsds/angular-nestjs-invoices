export const environment = {
  production: false,
  mock: true,
  apiUrl: {
    invoices: {
      list: '/mock/responses/invoices/list.json',
      one: '/mock/responses/invoices/one.json',
      create: '/mock/responses/invoices/one.json',
      update: '/mock/responses/invoices/one.json',
      remove: '/mock/responses/invoices/one.json',
    },
  },
};
