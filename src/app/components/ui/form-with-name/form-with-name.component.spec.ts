import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithNameComponent } from './form-with-name.component';

describe('FormWithNameComponent', () => {
  let component: FormWithNameComponent;
  let fixture: ComponentFixture<FormWithNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormWithNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormWithNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
