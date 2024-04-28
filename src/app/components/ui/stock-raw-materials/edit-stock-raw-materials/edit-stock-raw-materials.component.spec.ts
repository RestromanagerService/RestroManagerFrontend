import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockRawMaterialsComponent } from './edit-stock-raw-materials.component';

describe('EditStockRawMaterialsComponent', () => {
  let component: EditStockRawMaterialsComponent;
  let fixture: ComponentFixture<EditStockRawMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStockRawMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStockRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
