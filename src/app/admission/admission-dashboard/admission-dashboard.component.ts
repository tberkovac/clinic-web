import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { PaginationService } from 'src/app/services/pagination.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-admission-dashboard',
  templateUrl: './admission-dashboard.component.html',
  styleUrls: ['./admission-dashboard.component.scss'],
  providers: [PaginationService]
})
export class AdmissionDashboardComponent implements OnInit {
  displayedColumns: string[] = ["admissionId", "Date", "Patient Name", "Doctor Name", "Emergency", "Action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Admission>()

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private admissionService: AdmissionService,
    private authService: AuthService,
    private paginationService: PaginationService<Admission>) {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit() {
    this.initializeAdmissions()
  }

  initializeAdmissions() {
    this.admissionService.getAdmissions(1, 1).subscribe((admissionsPage) => {
      this.paginationService.setData(admissionsPage.data);
      this.paginationService.setPageSize(admissionsPage.pageSize)
      this.paginationService.setTotalCount(admissionsPage.numberOfElements)
    })
  }

  pageChanged(event: any) {
    this.admissionService.getAdmissions(event.pageIndex+1, event.pageSize).subscribe((admissionsPage) => {
      this.paginationService.setData(admissionsPage.data)
      this.paginationService.setPage(admissionsPage.page)
      this.paginationService.setPageSize(admissionsPage.pageSize)
      this.paginationService.setTotalCount(admissionsPage.numberOfElements)
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

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 4000, verticalPosition: 'bottom' });
  }

  logout() {
    this.authService.logout()
  }
}
