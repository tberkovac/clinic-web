import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-create-patient-dialog',
  templateUrl: './create-patient-dialog.component.html',
  styleUrls: ['./create-patient-dialog.component.scss'],
})
export class CreatePatientDialogComponent {

  @Output() successEvent = new EventEmitter<void>();

  fullNameControl = new FormControl<string>("", [Validators.required])
  dateOfBirthControl = new FormControl("", [Validators.required])
  umcnControl = new FormControl("", Validators.required)
  genderControl = new FormControl('other', Validators.required)
  addressControl = new FormControl()
  phoneNumberControl = new FormControl()


  patient = this.formBuilder.group({
    fullName: this.fullNameControl,
    dateOfBirth: this.dateOfBirthControl,
    umcn: this.umcnControl,
    gender: this.genderControl,
    address: this.addressControl,
    phoneNumber: this.phoneNumberControl,
  });

  constructor(private formBuilder: FormBuilder, private patientService: PatientService) {

  }

  createPatient() {
    const patientData: Patient = {
      ...this.patient.value as unknown as Patient,
      patientId: 0,
    };
    patientData.gender = parseInt(patientData.gender.toString(), 10),
    this.patientService.createPatient(patientData).subscribe({
      next: (patient) => this.successEvent.emit(),
      error: (err) => console.log(err)
    })
  }
}
