import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
      ReactiveFormsModule,
      MatSelectModule,
      MatOptionModule,
    ],
  styleUrls: ['./rate-viewer.component.css']
})
export class RateViewerComponent {
  // TODO pass data
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
      tags: [''],
      copayType: [''],
      copayRate: [''],
      claimType: [''],
      rollUpType: [''],
      placeOfService: ['']
    });
  }

  // TODO make form submit mock
  // of endpoint call: pass all form values to service
  // from all tabs and inputs (there would be multiple forms at once)
}
