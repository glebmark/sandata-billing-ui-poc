import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, FormArray, FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";

// TODO implement formula of
// dynamic rate calculation
@Component({
    selector: "app-rate-dynamic-subeditor",
    template: `
    <div [formGroup]="form">
      <label for="name">Name</label>
      <input id="name" formControlName="name" matInput readonly>
      
      <label for="rateType">Rate Type</label>
      <input id="rateType" formControlName="rateType" matInput readonly>
      
      <label for="staticRate">Static Rate</label>
      <input id="staticRate" formControlName="staticRate" matInput>
      
      <label for="dynamicUnits">Dynamic Units</label>
      <input id="dynamicUnits" formControlName="dynamicUnits" matInput>
      
      <label for="dynamicRate">Dynamic Rate</label>
      <input id="dynamicRate" formControlName="dynamicRate" matInput>
      
      <label for="dynamicModifier">Dynamic Modifier</label>
      <input id="dynamicModifier" formControlName="dynamicModifier" matInput>
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