import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatMenuModule } from '@angular/material/menu';
import { InvoicesListComponent } from './invoices-list.component';

describe('InvoicesListComponent', () => {
  let component: InvoicesListComponent;
  let fixture: ComponentFixture<InvoicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicesListComponent],
      imports: [MatMenuModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
