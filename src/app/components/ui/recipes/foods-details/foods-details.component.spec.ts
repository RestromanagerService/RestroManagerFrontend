import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsDetailsComponent } from './foods-details.component';

describe('FoodsDetailsComponent', () => {
  let component: FoodsDetailsComponent;
  let fixture: ComponentFixture<FoodsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
