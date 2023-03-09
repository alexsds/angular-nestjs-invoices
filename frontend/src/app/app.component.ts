import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { InvoiceFormService } from './shared/services/invoice-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isOpenForm = false;

  constructor(
    private invoiceFormService: InvoiceFormService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
    this.invoiceFormService.isOpen().subscribe(value => {
      this.isOpenForm = value;
      if (this.isOpenForm) {
        this.renderer.addClass(this.document.body, 'noscroll');
      } else {
        this.renderer.removeClass(this.document.body, 'noscroll');
      }
    });
  }
}
