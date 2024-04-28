import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRawMaterialsComponent } from './stock-raw-materials.component';

describe('StockRawMaterialsComponent', () => {
  let component: StockRawMaterialsComponent;
  let fixture: ComponentFixture<StockRawMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockRawMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
