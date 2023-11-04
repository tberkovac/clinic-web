import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor';
import { Title } from 'src/app/models/title';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-create-doctor-dialog',
  templateUrl: './create-doctor-dialog.component.html',
  styleUrls: ['./create-doctor-dialog.component.scss']
})
export class CreateDoctorDialogComponent {

  @Output() successEvent = new EventEmitter<Doctor>();
  @Output() failureEvent = new EventEmitter<string>();

  titles: Title[] = [
    {
      titleId: 1,
      titleName: "Specialisant"
    },
    {
      titleId: 2,
      titleName: "Specialist"
    },
    {
      titleId: 3,
      titleName: "Nurse"
    }]

  nameControl = new FormControl<string>("", [Validators.required])
  surnameControl = new FormControl<string>("", [Validators.required])
  titleIdControl = new FormControl<number>(0, Validators.required)
  codeControl = new FormControl<string>("", Validators.required)
  passwordControl = new FormControl<string>("", Validators.required)

  doctor = this.formBuilder.group({
    name: this.nameControl,
    surname: this.surnameControl,
    titleId: this.titleIdControl,
    code: this.codeControl,
    password: this.passwordControl
  });

  constructor(private formBuilder: FormBuilder, private doctorService: DoctorService) {

  }

  createDoctor() {
    const doctorData: Doctor = {
      ...this.doctor.value as unknown as Doctor,
      doctorId: 0,
    };
    this.doctorService.createDoctor(doctorData).subscribe({
      next: (doctor) => this.successEvent.emit(doctor),
      error: (err) => this.failureEvent.emit(err)
    })
  }
}
