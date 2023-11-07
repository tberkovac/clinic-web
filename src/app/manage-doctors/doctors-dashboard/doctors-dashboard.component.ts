import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { CreateDoctorDialogComponent } from '../create-doctor-dialog/create-doctor-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginationService } from 'src/app/services/pagination.service';
import { combineLatest, map } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-doctors-dashboard',
  templateUrl: './doctors-dashboard.component.html',
  styleUrls: ['./doctors-dashboard.component.scss'],
  providers: [PaginationService]
})
export class DoctorsDashboardComponent {
  displayedColumns: string[] = ["Name", "Surname", "Title", "Code", "Action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Doctor>()

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

  constructor(private doctorService: DoctorService, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar, private paginationService: PaginationService<Doctor>) {
    this.dataSource.paginator = this.paginator
    this.initializeDoctorList()
  }

  initializeDoctorList() {
    this.doctorService.getDoctors(1, 10).subscribe((doctorsPage) => {
      this.paginationService.setData(doctorsPage.data);
      this.paginationService.setPageSize(doctorsPage.pageSize)
      this.paginationService.setTotalCount(doctorsPage.numberOfElements)
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
      this.openSnackbar(`Error while processing the request ${JSON.stringify(error)}`)
      dialogRef.close()
    })
  }

  deleteDoctor(doctorId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: 'auto',
      data: {
        title: 'Delete Patient',
        message: 'Are you sure you want to delete this doctor?',
        btnOkText: 'Delete',
        btnCancelText: 'Cancel'
      }
    })

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.doctorService.deleteDoctor(doctorId).subscribe({
        next: (doctor) => {
          this.openSnackbar('Successfully deleted patient!')
          this.initializeDoctorList()
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
    this.doctorService.getDoctors(event.pageIndex + 1, event.pageSize).subscribe((admissionsPage) => {
      this.paginationService.setData(admissionsPage.data)
      this.paginationService.setPage(admissionsPage.page)
      this.paginationService.setPageSize(admissionsPage.pageSize)
      this.paginationService.setTotalCount(admissionsPage.numberOfElements)
    });
  }
}
