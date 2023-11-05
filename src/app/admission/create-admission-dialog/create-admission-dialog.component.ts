import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { Admission } from 'src/app/models/admission';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { AdmissionService } from 'src/app/services/admission.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-create-admission-dialog',
  templateUrl: './create-admission-dialog.component.html',
  styleUrls: ['./create-admission-dialog.component.scss']
})
export class CreateAdmissionDialogComponent implements OnInit {
  @Output() successEvent = new EventEmitter<void>();
  @Output() failureEvent = new EventEmitter<string>();

  dateOfAdmissionControl = new FormControl(new Date(), [Validators.required])
  patientIdControl = new FormControl<number>(0)
  doctorIdControl = new FormControl<number>(0)
  emergencyControl = new FormControl<boolean>(false)

  admission = this.formBuilder.group({
    dateOfAdmission: this.dateOfAdmissionControl,
    patientId: this.patientIdControl,
    doctorId: this.doctorIdControl,
    emergency: this.emergencyControl
  });

  doctors$ = this.doctorService.getDoctors()
  patients$ = this.patientService.getPatients()
  data$ = combineLatest([this.doctors$, this.patients$]).pipe(
    map(([doctors, patients]) => ({
      doctors,
      patients
    }))
  )

  positions: any[] = ['Programmer', 'Businness Analyst', 'Designer', 'DBA'];


  constructor(private formBuilder: FormBuilder, 
    private patientService: PatientService, 
    private doctorService: DoctorService,
    private admissionService: AdmissionService) {
      
  }

  ngOnInit() {
   
  }

  createAdmission() {
    const admissionData: Admission = {
      ...this.admission.value as unknown as Admission,
      admissionId: 0
    };
    this.admissionService.createAdmission(admissionData).subscribe({
      next: (admission) => this.successEvent.emit(),
      error: (err) => this.failureEvent.emit(err)
    })
  }
}
