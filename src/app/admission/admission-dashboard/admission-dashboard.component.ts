import { Component, ViewChild } from '@angular/core';
import { Admission } from '../../models/admission';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreatePatientDialogComponent } from '../../create-patient/create-patient-dialog/create-patient-dialog.component';

@Component({
  selector: 'app-admission-dashboard',
  templateUrl: './admission-dashboard.component.html',
  styleUrls: ['./admission-dashboard.component.scss']
})
export class AdmissionDashboardComponent {
  admissions : Admission[] = [{admissionId: 1, admissionDate: new Date(), patientName: "Patient1", doctorName: "Doctor1", isEmergency: false},
  {admissionId: 2, admissionDate: new Date(), patientName: "Patient2", doctorName: "Doctor2", isEmergency: false},
  {admissionId: 3, admissionDate: new Date(), patientName: "Patient3", doctorName: "Doctor3", isEmergency: false}]
  displayedColumns: string[] = ["admissionId", "Date", "Patient Name", "Doctor Name", "Emergency", "Action"];
  @ViewChild(MatPaginator) paginator! : MatPaginator
  dataSource = new MatTableDataSource<Admission>(this.admissions)

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private dialog: MatDialog) {
    this.dataSource.paginator = this.paginator
  }

  openCreatePatient() {
    const dialogRef = this.dialog.open(CreatePatientDialogComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })

    dialogRef.componentInstance.successEvent.subscribe(() => {
      dialogRef.close()
    })
  }
}
