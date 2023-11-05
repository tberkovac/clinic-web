import { Component, ViewChild } from '@angular/core';
import { Admission } from '../../models/admission';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreatePatientDialogComponent } from '../../create-patient/create-patient-dialog/create-patient-dialog.component';
import { CreateAdmissionDialogComponent } from '../create-admission-dialog/create-admission-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admission-dashboard',
  templateUrl: './admission-dashboard.component.html',
  styleUrls: ['./admission-dashboard.component.scss']
})
export class AdmissionDashboardComponent {
  admissions! : Admission[] 
  displayedColumns: string[] = ["admissionId", "Date", "Patient Name", "Doctor Name", "Emergency", "Action"];
  @ViewChild(MatPaginator) paginator! : MatPaginator
  dataSource = new MatTableDataSource<Admission>(this.admissions)

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private admissionService: AdmissionService,
    private authService: AuthService) {
    this.dataSource.paginator = this.paginator
    this.initializeAdmissions()
  }

  initializeAdmissions() {
    this.admissionService.getAdmissions().subscribe((admissions) => {
      this.admissions = admissions
    })
  }

  openCreatePatient() {
    const dialogRef = this.dialog.open(CreatePatientDialogComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })

    dialogRef.componentInstance.successEvent.subscribe((patient) => {
      this.openSnackbar(`Successfully added patient with name ${patient.fullName}!`)
      dialogRef.close()
    })

    dialogRef.componentInstance.failureEvent.subscribe((error) => {
      this.openSnackbar(`Error while processing the request ${error}`)
      dialogRef.close()
    })
  }

  openCreateAdmission() {
    const dialogRef = this.dialog.open(CreateAdmissionDialogComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })

    dialogRef.componentInstance.successEvent.subscribe((admission) => {
      this.initializeAdmissions()
      this.openSnackbar('Successfully added new appointment!')
      dialogRef.close()
    })

    dialogRef.componentInstance.failureEvent.subscribe((error) => {
      this.openSnackbar(`Error while processing the request ${error}`)
      dialogRef.close()
    })
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 4000, verticalPosition: 'bottom' });
  }

  logout() {
    this.authService.logout()
  }
}
