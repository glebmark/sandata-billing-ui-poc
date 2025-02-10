import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-rate-viewer',
  templateUrl: './rate-viewer.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
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
export class RateViewerComponent implements OnInit {
  // TODO pass data

  @Input() formGroupIndex!: number;
  @Input() rateType!: string;

  form!: FormGroup;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.form  = this.controlContainer.control?.get('rateViewerForm') as FormGroup;
    console.log("Data inside RateViewerComponent")
    console.log(this.form)
  }
}
