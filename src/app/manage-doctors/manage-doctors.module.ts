import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreatePatientModule } from 'src/app/create-patient/create-patient.module';
import { CreateDoctorDialogComponent } from './create-doctor-dialog/create-doctor-dialog.component';
import { DoctorsDashboardComponent } from './doctors-dashboard/doctors-dashboard.component';
import { ManageDoctorsRoutingModule } from './manage-doctors-routing.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    CreateDoctorDialogComponent,
    DoctorsDashboardComponent
  ],
  imports: [
    ManageDoctorsRoutingModule,
    CreatePatientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    MatRippleModule,
    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule,
    HttpClientModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe
  ],
})
export class ManageDoctorsModule { }
