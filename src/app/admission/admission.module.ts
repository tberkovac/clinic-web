import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule, MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdmissionDashboardComponent } from './admission-dashboard/admission-dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { CreatePatientModule } from 'src/app/create-patient/create-patient.module';
import { AddmissionRoutingModule } from './admission-routing.module';
import { CommonModule } from '@angular/common';
import { CreateAdmissionDialogComponent } from './create-admission-dialog/create-admission-dialog.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        AdmissionDashboardComponent,
        CreateAdmissionDialogComponent,
    ],
    imports: [
        CommonModule,
        AddmissionRoutingModule,
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
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
})
export class AdmissionModule { }
