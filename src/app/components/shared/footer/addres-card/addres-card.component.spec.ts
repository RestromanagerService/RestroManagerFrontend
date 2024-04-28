import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresCardComponent } from './addres-card.component';

describe('AddresCardComponent', () => {
  let component: AddresCardComponent;
  let fixture: ComponentFixture<AddresCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddresCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddresCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
