import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { combineLatest } from 'rxjs';
import { InvoiceFormService } from './shared/services/invoice-form.service';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isOpenForm = false;
  isOpenModal = false;

  constructor(
    private invoiceFormService: InvoiceFormService,
    private modalService: ModalService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
    combineLatest(
      this.invoiceFormService.isOpen(),
      this.modalService.isOpen()
    ).subscribe(([isOpenForm, isOpenModal]) => {
      this.isOpenForm = isOpenForm;
      this.isOpenModal = isOpenModal;
      if (this.isOpenForm || this.isOpenModal) {
        this.renderer.addClass(this.document.body, 'noscroll');
      } else {
        this.renderer.removeClass(this.document.body, 'noscroll');
      }
    });
  }
}
