import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-rate-viewer',
  templateUrl: './rate-viewer.component.html',
    imports: [
        MatNativeDateModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule,
        MatTabsModule,
        ReactiveFormsModule],
  styleUrls: ['./rate-viewer.component.css']
})
export class RateViewerComponent {
  rateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rateForm = this.fb.group({
      evvIdentifier: [''],
      eventCode: [''],
      effectiveDate: [''],
      service: [''],
      modifier: [''],
      revcode: [''],
      description: [''],
      payer: [''],
      program: [''],
      memberId: [''],
      tags: ['']
    });
  }
}
