import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodsComponent } from './add-foods.component';

describe('AddFoodsComponent', () => {
  let component: AddFoodsComponent;
  let fixture: ComponentFixture<AddFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
