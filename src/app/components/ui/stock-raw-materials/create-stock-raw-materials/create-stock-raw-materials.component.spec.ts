import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockRawMaterialsComponent } from './create-stock-raw-materials.component';

describe('CreateStockRawMaterialsComponent', () => {
  let component: CreateStockRawMaterialsComponent;
  let fixture: ComponentFixture<CreateStockRawMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStockRawMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStockRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
