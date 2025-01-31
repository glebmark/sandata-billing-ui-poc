import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
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

    @Input() rateType!: "generalRate" | "weekendRate" | "holidayRate";

    @Output() formOutput = new EventEmitter<any>();
    
    rateForm = new FormGroup({
        units: new FormControl(''),
        rate: new FormControl(''),
        modifier: new FormControl(''),
    });

    constructor() {
        console.log(this.rateType)
    }

    public emitRateForms(): void {
        console.log('inside dynamic-subeditor: emitRateForms:', this.rateForm.value, this.rateType);
        this.formOutput.emit({
            rateType: this.rateType,
            ...this.rateForm.value
        });
    }
}