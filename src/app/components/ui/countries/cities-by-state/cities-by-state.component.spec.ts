import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesByStateComponent } from './cities-by-state.component';

describe('CitiesByStateComponent', () => {
  let component: CitiesByStateComponent;
  let fixture: ComponentFixture<CitiesByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesByStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitiesByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
