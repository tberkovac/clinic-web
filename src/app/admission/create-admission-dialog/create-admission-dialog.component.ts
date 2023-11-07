import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { Admission } from 'src/app/models/admission';
import { AdmissionService } from 'src/app/services/admission.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-create-admission-dialog',
  templateUrl: './create-admission-dialog.component.html',
  styleUrls: ['./create-admission-dialog.component.scss']
})
export class CreateAdmissionDialogComponent {
  @Output() successEvent = new EventEmitter<void>();
  @Output() failureEvent = new EventEmitter<string>();

  dateOfAdmissionControl = new FormControl("", [Validators.required])
  patientIdControl = new FormControl<number>(0, [Validators.required])
  doctorIdControl = new FormControl<number>(0, [Validators.required])
  emergencyControl = new FormControl<boolean>(false, [Validators.required])

  admission = this.formBuilder.group({
    admissionDate: this.dateOfAdmissionControl,
    patientId: this.patientIdControl,
    doctorId: this.doctorIdControl,
    emergency: this.emergencyControl
  });

  doctors$ = this.doctorService.getAllDoctors()
  patients$ = this.patientService.getAllPatients()
  data$ = combineLatest([this.doctors$, this.patients$]).pipe(
    map(([doctors, patients]) => ({
      doctors,
      patients
    }))
  )

  today = new Date()

  constructor(private formBuilder: FormBuilder, 
    private patientService: PatientService, 
    private doctorService: DoctorService,
    private admissionService: AdmissionService) {
      
  }

  createAdmission() {
    const admissionData: Admission = {
      ...this.admission.value as unknown as Admission,
      admissionId: 0
    };
    console.log(JSON.stringify(admissionData))
    this.admissionService.createAdmission(admissionData).subscribe({
      next: (admission) => this.successEvent.emit(),
      error: (err) => this.failureEvent.emit(err)
    })
  }
}
