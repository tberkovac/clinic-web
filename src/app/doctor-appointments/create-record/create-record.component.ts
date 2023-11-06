import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admission } from 'src/app/models/admission';
import { Record } from 'src/app/models/record';
import { AdmissionService } from 'src/app/services/admission.service';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent {

  @Output() successEvent = new EventEmitter<void>();
  @Output() failureEvent = new EventEmitter<string>();

  descriptionControl = new FormControl<string>("", [Validators.required])

  record = this.formBuilder.group({
    description: this.descriptionControl,
  });

  constructor(private formBuilder: FormBuilder, private recordService: RecordService, private admissionService: AdmissionService,
    @Inject(MAT_DIALOG_DATA) public data: { admission: Admission }) {
  }

  createRecord() {
    const recordData: Record = {
      ...this.record.value as unknown as Record,
      recordId: 0,
      createdAt: new Date()
    };
    this.recordService.createRecord(recordData, this.data.admission.admissionId!).subscribe({
      next: (admission) => this.successEvent.emit(),
      error: (err) => this.failureEvent.emit(err)
    })
  }
}
