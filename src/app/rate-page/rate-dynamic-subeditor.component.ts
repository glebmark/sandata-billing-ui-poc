import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

// TODO implement formula of
// dynamic rate calculation
@Component({
    selector: "app-rate-dynamic-subeditor",
    template: `
    <form [formGroup]="rateForm">
        <div class="form-row">
            <mat-form-field>
                <mat-label>Units</mat-label>
                <input matInput formControlName="units" />
            </mat-form-field>
            units per
            <mat-form-field>
                <mat-label>Rate</mat-label>
                <input matInput formControlName="rate" placeholder="$" />
            </mat-form-field>
            with modifier
            <mat-form-field>
                <mat-label>Modifier</mat-label>
                <input matInput formControlName="modifier" />
            </mat-form-field>
        </div>
    </form>
    `,
    imports: [
        MatInputModule, 
        ReactiveFormsModule,
        ],
    })
export class RateDynamicSubeditorComponent {
      rateForm: FormGroup;
    
      constructor(private fb: FormBuilder) {
        this.rateForm = this.fb.group({
          units: [''],
          rate: [''],
          modifier: [''],
        });
    }
}