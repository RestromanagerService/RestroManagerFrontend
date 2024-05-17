import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesByCountryComponent } from './states-by-country.component';

describe('StatesByCountryComponent', () => {
  let component: StatesByCountryComponent;
  let fixture: ComponentFixture<StatesByCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatesByCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatesByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
