import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManipulationWaiterComponent } from './order-manipulation-waiter.component';

describe('OrderManipulationWaiterComponent', () => {
  let component: OrderManipulationWaiterComponent;
  let fixture: ComponentFixture<OrderManipulationWaiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderManipulationWaiterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderManipulationWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
