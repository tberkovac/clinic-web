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
import { PatientsDashboardComponent } from './patients-dashboard/patients-dashboard.component';
import { ManagePatientsRoutingModule } from './manage-patients-routing.module';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    PatientsDashboardComponent
  ],
  imports: [
    CommonModule,
    ManagePatientsRoutingModule,
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
export class ManagePatientsModule { }
