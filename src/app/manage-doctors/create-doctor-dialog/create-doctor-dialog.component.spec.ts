import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoctorDialogComponent } from './create-doctor-dialog.component';

describe('CreateDoctorDialogComponent', () => {
  let component: CreateDoctorDialogComponent;
  let fixture: ComponentFixture<CreateDoctorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDoctorDialogComponent]
    });
    fixture = TestBed.createComponent(CreateDoctorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
