import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstockcommercialproductsComponent } from './editstockcommercialproducts.component';

describe('EditstockcommercialproductsComponent', () => {
  let component: EditstockcommercialproductsComponent;
  let fixture: ComponentFixture<EditstockcommercialproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditstockcommercialproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditstockcommercialproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
