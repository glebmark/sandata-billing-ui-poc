import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { RateDynamicSubeditorComponent } from "./rate-dynamic-subeditor.component";

@Component({
    selector: "app-rate-editor",
    template: `
    <h3>Rate:</h3>
    <mat-tab-group>
        <mat-tab label="Static">
            <form [formGroup]="rateForm">
                <div class="form-row">
                    <mat-form-field>
                        <mat-label>Rate</mat-label>
                        <input matInput formControlName="rateStatic" placeholder="$" />
                    </mat-form-field>
                </div>
            </form>
        </mat-tab>
        <mat-tab label="Dynamic">
            <app-rate-dynamic-subeditor (formOutput)="getRateFormOutput($event)" [rateType]="'generalRate'"/>
        </mat-tab>
    </mat-tab-group>

    <h3>Weekend Rate:</h3>
    <mat-tab-group>
        <mat-tab label="Static">
            <form [formGroup]="rateForm">
                <div class="form-row">
                    <mat-form-field>
                        <mat-label>Rate</mat-label>
                        <input matInput formControlName="weekendRateStatic" placeholder="$" />
                    </mat-form-field>
                </div>
            </form>
        </mat-tab>
        <mat-tab label="Dynamic">
            <app-rate-dynamic-subeditor (formOutput)="getRateFormOutput($event)" [rateType]="'weekendRate'"/>
        </mat-tab>
    </mat-tab-group>

    <h3>Holiday rate:</h3>
    <mat-tab-group>
        <mat-tab label="Static">
            <form [formGroup]="rateForm">
                <div class="form-row">
                    <mat-form-field>
                        <mat-label>Rate</mat-label>
                        <input matInput formControlName="holidayRateStatic" placeholder="$" />
                    </mat-form-field>
                </div>
            </form>
        </mat-tab>
        <mat-tab label="Dynamic">
            <app-rate-dynamic-subeditor (formOutput)="getRateFormOutput($event)" [rateType]="'holidayRate'"/>
        </mat-tab>
    </mat-tab-group>
    `,
    imports: [
        MatInputModule, 
        ReactiveFormsModule,
        MatTabsModule,
        RateDynamicSubeditorComponent
        ],
    })
export class RateEditorComponent {

    @ViewChild(RateDynamicSubeditorComponent) rateDynamicSubeditorComponent!: RateDynamicSubeditorComponent;

    @Output() formOutput = new EventEmitter<any>();

    // TODO make names unique or they overwrite each other
    rateForm = new FormGroup({
        rateStatic: new FormControl(''),
        weekendRateStatic: new FormControl(''),
        holidayRateStatic: new FormControl(''),
      });

    output = {}

    public emitRateForms(): void {
        // we can call children's emit from here

        this.rateDynamicSubeditorComponent.emitRateForms();
        
        this.formOutput.emit(this.output);
    }

    getRateFormOutput(date: any): void {
        // merge date with this.rateForm.value

        this.output = {...this.rateForm.value, date}


        console.log('Editor: Picked date: ', date);
    }
}