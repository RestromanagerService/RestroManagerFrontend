import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormWithNameComponent } from './modal-form-with-name.component';

describe('ModalFormWithNameComponent', () => {
  let component: ModalFormWithNameComponent;
  let fixture: ComponentFixture<ModalFormWithNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormWithNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFormWithNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
