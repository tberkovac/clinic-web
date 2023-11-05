import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, of } from 'rxjs';
import { CreateAdmissionDialogComponent } from 'src/app/admission/create-admission-dialog/create-admission-dialog.component';
import { CreatePatientDialogComponent } from 'src/app/create-patient/create-patient-dialog/create-patient-dialog.component';
import { Admission } from 'src/app/models/admission';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateRecordComponent } from '../create-record/create-record.component';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent {
  admissions!: Admission[]
  displayedColumns: string[] = ["admissionId", "Date", "Patient Name", "Doctor Name", "Emergency", "Action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Admission>(this.admissions)

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar,
    private admissionService: AdmissionService, private authService: AuthService) {
    this.dataSource.paginator = this.paginator
    this.initializeAdmissions()
  }

  initializeAdmissions() {
    this.authService.getLoggedUser().pipe(
      switchMap((user) => {
        if (user.userId) {
          return this.admissionService.getAdmissionsForUser(user.userId);
        }
        return of([]);
      })
    ).subscribe((admissions) => {
      this.admissions = admissions;
    });
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

  openCreateRecord(admission: Admission) {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: { admission }
    })

    dialogRef.componentInstance.successEvent.subscribe((record) => {
      this.openSnackbar('Successfully created record for admission')
      this.initializeAdmissions()
      dialogRef.close()
    })

    dialogRef.componentInstance.failureEvent.subscribe((err) => {
      this.openSnackbar(`Error while processing request: ${JSON.stringify(err)}`)
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
