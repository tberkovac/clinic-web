import { NgModule } from '@angular/core';
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
import { CreatePatientDialogComponent } from './create-patient-dialog/create-patient-dialog.component';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    declarations: [
        CreatePatientDialogComponent
    ],
    imports: [
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
    ],
    exports: [
        CreatePatientDialogComponent
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class CreatePatientModule { }
