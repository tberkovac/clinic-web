import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-patient-dialog',
  templateUrl: './create-patient-dialog.component.html',
  styleUrls: ['./create-patient-dialog.component.scss'],
})
export class CreatePatientDialogComponent {

  fullNameControl = new FormControl("")
  dateOfBirthControl = new FormControl()
  umcnControl = new FormControl()
  genderControl = new FormControl('other')
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

  constructor(private formBuilder: FormBuilder) {

  }

  createPatient() {
    console.log(this.patient.value)
  }
}
