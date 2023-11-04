import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { CreateDoctorDialogComponent } from '../create-doctor-dialog/create-doctor-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctors-dashboard',
  templateUrl: './doctors-dashboard.component.html',
  styleUrls: ['./doctors-dashboard.component.scss']
})
export class DoctorsDashboardComponent {
  doctors!: Doctor[]
  displayedColumns: string[] = ["Name", "Surname", "Title", "Code", "Action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Doctor>(this.doctors)

  constructor(private doctorService: DoctorService, private dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {
    this.dataSource.paginator = this.paginator
    this.initializeDoctorList()
  }

  initializeDoctorList() {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => this.doctors = doctors,
      error: (err) => console.log(err)
    })
  }

  goBack() {
    this.router.navigate(['admission-dashboard'])
  }

  openCreateDoctor() {
    const dialogRef = this.dialog.open(CreateDoctorDialogComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })

    dialogRef.componentInstance.successEvent.subscribe((doctor) => {
      this.initializeDoctorList()
      this.openSnackbar(`Doctor ${doctor.name} ${doctor.surname} successfully added!`)
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
}
