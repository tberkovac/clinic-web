import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsDashboardComponent } from './doctors-dashboard.component';

describe('DoctorsDashboardComponent', () => {
  let component: DoctorsDashboardComponent;
  let fixture: ComponentFixture<DoctorsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsDashboardComponent]
    });
    fixture = TestBed.createComponent(DoctorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
