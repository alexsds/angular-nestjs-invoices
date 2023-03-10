import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoicesDetailedComponent } from './invoices-detailed.component';

describe('InvoicesDetailedComponent', () => {
  let component: InvoicesDetailedComponent;
  let fixture: ComponentFixture<InvoicesDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicesDetailedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
