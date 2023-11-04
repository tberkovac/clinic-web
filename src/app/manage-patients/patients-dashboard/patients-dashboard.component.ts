import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePatientDialogComponent } from 'src/app/create-patient/create-patient-dialog/create-patient-dialog.component';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common';
import { Gender } from 'src/app/models/gender';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patients-dashboard',
  templateUrl: './patients-dashboard.component.html',
  styleUrls: ['./patients-dashboard.component.scss']
})
export class PatientsDashboardComponent {
[x: string]: any;
  patients!: Patient[]
  displayedColumns: string[] = ["Name", "Surname", "Title", "Code", "Action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Patient>(this.patients)

  constructor(private patientService: PatientService, private dialog: MatDialog, private router: Router) {
    this.dataSource.paginator = this.paginator
    this.initializePatientList()
  }

  initializePatientList() {
    this.patientService.getPatients().subscribe({
      next: (patients) => this.patients = patients,
      error: (err) => console.log(err)
    })
  }

  convertGenderToString(gender: Gender) : string {
    return Gender[gender]
  }

  goBack() {
    this.router.navigate(['admission-dashboard'])
  }

  openCreatePatient() {
    const dialogRef = this.dialog.open(CreatePatientDialogComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })

    dialogRef.componentInstance.successEvent.subscribe(() => {
      this.initializePatientList()
    })
  }
}
