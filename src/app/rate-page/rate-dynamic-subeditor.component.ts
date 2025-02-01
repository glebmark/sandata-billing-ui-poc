import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, FormArray, FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { RateType } from "./rates-list-viewer.component";

// TODO implement formula of
// dynamic rate calculation
@Component({
    selector: "app-rate-dynamic-subeditor",
    template: `
    <div [formGroup]="form">
      <mat-tab-group>

        @if (rateType !== rateTypeEnum.GeneralRate) {
            <mat-tab label="No"></mat-tab>
        }

        <mat-tab label="Static">

            <mat-form-field>
                <mat-label>Static Rate</mat-label>
                <input matInput formControlName="staticRate">
            </mat-form-field>

        </mat-tab>

        <mat-tab label="Dynamic">

            <mat-form-field>
                <mat-label>Units</mat-label>
                <input matInput formControlName="dynamicUnits">
            </mat-form-field>
            units per

            <!-- TODO make switch per / for -->
            <mat-form-field>
                <mat-label>Rate</mat-label>
                <input matInput formControlName="dynamicRate">
            </mat-form-field>
            with modifier

            <mat-form-field>
                <mat-label>Modifier</mat-label>
                <input matInput formControlName="dynamicModifier">
            </mat-form-field>
        </mat-tab>

      </mat-tab-group>

      <!-- TODO add Each additional unit per -->
    </div>
    `,
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    imports: [
        MatInputModule,
        MatTabsModule,
        ReactiveFormsModule,
        ],
    })
export class RateDynamicSubeditorComponent implements OnInit {
    // TODO pass data

    rateTypeEnum = RateType

    @Input() formGroupIndex!: number;
    @Input() rateType!: string;

    form!: FormGroup;

    constructor(private controlContainer: ControlContainer) {
    }

    ngOnInit(): void {
        const formArray = this.controlContainer.control?.get('rateSubeditorForms') as FormArray;
        this.form = formArray.at(this.formGroupIndex) as FormGroup;
    }
}