import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManipulationComponent } from './order-manipulation.component';

describe('OrderManipulationComponent', () => {
  let component: OrderManipulationComponent;
  let fixture: ComponentFixture<OrderManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderManipulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
