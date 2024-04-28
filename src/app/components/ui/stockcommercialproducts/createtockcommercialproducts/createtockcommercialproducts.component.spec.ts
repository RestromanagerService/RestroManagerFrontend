import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetockcommercialproductsComponent } from './createtockcommercialproducts.component';

describe('CreatetockcommercialproductsComponent', () => {
  let component: CreatetockcommercialproductsComponent;
  let fixture: ComponentFixture<CreatetockcommercialproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatetockcommercialproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatetockcommercialproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
