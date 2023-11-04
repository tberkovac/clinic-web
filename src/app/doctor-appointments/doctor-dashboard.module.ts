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
import { DoctorsDashboardComponent } from '../manage-doctors/doctors-dashboard/doctors-dashboard.component';
import { DoctorDashboardRoutingModule } from './doctor-dashboard-routing.module';

@NgModule({
  declarations: [
    DoctorsDashboardComponent
  ],
  imports: [
    DoctorDashboardRoutingModule,
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
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
})
export class DoctorDashboardModule { }
