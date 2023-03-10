import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesDetailedComponent } from './pages/invoices-detailed/invoices-detailed.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesListComponent,
  },
  {
    path: ':id',
    component: InvoicesDetailedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
