import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductFoodComponent } from './edit-product-food.component';

describe('EditProductFoodComponent', () => {
  let component: EditProductFoodComponent;
  let fixture: ComponentFixture<EditProductFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
