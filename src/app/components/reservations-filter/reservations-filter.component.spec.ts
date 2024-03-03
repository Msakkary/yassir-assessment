import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsFilterComponent } from './reservations-filter.component';

describe('ReservationsFilterComponent', () => {
  let component: ReservationsFilterComponent;
  let fixture: ComponentFixture<ReservationsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
