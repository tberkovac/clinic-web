import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePatientDialogComponent } from 'src/app/create-patient/create-patient-dialog/create-patient-dialog.component';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Gender } from 'src/app/models/gender';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/services/pagination.service';
import { combineLatest, map } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-patients-dashboard',
  templateUrl: './patients-dashboard.component.html',
  styleUrls: ['./patients-dashboard.component.scss'],
  providers: [PaginationService]
})
export class PatientsDashboardComponent {
  displayedColumns: string[] = ["Name", "Surname", "Title", "Code", "Action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Patient>()

  data$ = this.paginationService.data$
  currentPage$ = this.paginationService.currentPage$
  currentPageSize$ = this.paginationService.currentPageSize$
  totalCount$ = this.paginationService.totalCount$

  combinedData$ = combineLatest([this.data$, this.currentPage$, this.currentPageSize$, this.totalCount$]).pipe(
    map(([data, currentPage, currentPageSize, totalCount]) => ({
      currentPage,
      currentPageSize,
      data,
      totalCount
    })))

  constructor(private patientService: PatientService, private dialog: MatDialog, 
    private router: Router, private paginationService: PaginationService<Patient>,
    private snackBar: MatSnackBar) {
    this.dataSource.paginator = this.paginator
    this.initializePatientList()
  }

  initializePatientList() {
    this.patientService.getPatients(1, 10).subscribe((patientsPage) => {
      this.paginationService.setData(patientsPage.data);
      this.paginationService.setPage(patientsPage.page)
      this.paginationService.setPageSize(patientsPage.pageSize)
      this.paginationService.setTotalCount(patientsPage.numberOfElements)
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

  deletePatient(patientId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: 'auto',
      data: {
        title: 'Delete Patient',
        message: 'Are you sure you want to delete this patient?',
        btnOkText: 'Delete',
        btnCancelText: 'Cancel'
      }
    })

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.patientService.deletePatient(patientId).subscribe({
        next: (patient) => {
          this.openSnackbar('Successfully deleted patient!')
          this.initializePatientList()
        },
        error: (err) => {
          this.openSnackbar(`Error while processing request ${JSON.stringify(err)}`)
        }
      })
      dialogRef.close()
    })

    dialogRef.componentInstance.onDecline.subscribe(() => {
      console.log('cancel clicked')
      dialogRef.close()
    })
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 4000, verticalPosition: 'bottom' });
  }

  pageChanged(event: any) {
    this.patientService.getPatients(event.pageIndex + 1, event.pageSize).subscribe((patientsPage) => {
      this.paginationService.setData(patientsPage.data)
      this.paginationService.setPage(patientsPage.page)
      this.paginationService.setPageSize(patientsPage.pageSize)
      this.paginationService.setTotalCount(patientsPage.numberOfElements)
    });
  }
}
