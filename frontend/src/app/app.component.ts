import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Theme } from './shared/enums/theme.enum';
import { InvoiceFormService } from './shared/services/invoice-form.service';
import { ModalService } from './shared/services/modal.service';
import { ThemesService } from './shared/services/themes.service';
import { Store } from '@ngrx/store';
import { loadInvoices } from './store/invoice/invoice.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  private readonly CLASS_NO_SCROLL = 'noscroll';
  private readonly CLASS_THEME_DARK = 'theme-dark';
  private readonly CLASS_THEME_LIGHT = 'theme-light';

  title = 'frontend';
  isOpenForm = false;
  isOpenModal = false;

  constructor(
    private store: Store,
    private invoiceFormService: InvoiceFormService,
    private modalService: ModalService,
    private themesService: ThemesService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadInvoices());
    combineLatest([
      this.invoiceFormService.isOpen(),
      this.modalService.isOpen(),
      this.themesService.getTheme(),
    ]).subscribe(([isOpenForm, isOpenModal, theme]) => {
      this.isOpenForm = isOpenForm;
      this.isOpenModal = isOpenModal;
      if (this.isOpenForm || this.isOpenModal) {
        this.renderer.addClass(this.document.body, this.CLASS_NO_SCROLL);
      } else {
        this.renderer.removeClass(this.document.body, this.CLASS_NO_SCROLL);
      }

      if (theme === Theme.DARK) {
        this.renderer.removeClass(this.document.body, this.CLASS_THEME_LIGHT);
        this.renderer.addClass(this.document.body, this.CLASS_THEME_DARK);
      } else {
        this.renderer.removeClass(this.document.body, this.CLASS_THEME_DARK);
        this.renderer.addClass(this.document.body, this.CLASS_THEME_LIGHT);
      }
    });
  }
}
