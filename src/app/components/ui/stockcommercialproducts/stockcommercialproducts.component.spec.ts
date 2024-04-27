import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockcommercialproductsComponent } from './stockcommercialproducts.component';

describe('StockcommercialproductsComponent', () => {
  let component: StockcommercialproductsComponent;
  let fixture: ComponentFixture<StockcommercialproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockcommercialproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockcommercialproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
