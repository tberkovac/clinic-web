import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { CreateDoctorDialogComponent } from '../create-doctor-dialog/create-doctor-dialog.component';
import { Router } from '@angular/router';

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

  constructor(private doctorService: DoctorService, private dialog: MatDialog, private router: Router) {
    this.dataSource.paginator = this.paginator
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => this.doctors = doctors,
      error: (err) => console.log(err)
    })
  }

  goBack() {
    this.router.navigate(['admission-dashboard'])
  }

  openCreateDoctor() {
    this.dialog.open(CreateDoctorDialogComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }
}
