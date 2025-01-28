import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
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
                        <input matInput formControlName="static" placeholder="$" />
                    </mat-form-field>
                </div>
            </form>
        </mat-tab>
        <mat-tab label="Dynamic">
            <app-rate-dynamic-subeditor />
        </mat-tab>
    </mat-tab-group>


    <h3>Weekend Rate:</h3>
    <mat-tab-group>
        <mat-tab label="No"></mat-tab>
        <mat-tab label="Static">
            <form [formGroup]="rateForm">
                <div class="form-row">
                    <mat-form-field>
                        <mat-label>Rate</mat-label>
                        <input matInput formControlName="static" placeholder="$" />
                    </mat-form-field>
                </div>
            </form>
        </mat-tab>
        <mat-tab label="Dynamic">
            <app-rate-dynamic-subeditor />
        </mat-tab>
    </mat-tab-group>


    <h3>Holiday rate:</h3>
    <mat-tab-group>
        <mat-tab label="No"></mat-tab>
        <mat-tab label="Static">
            <form [formGroup]="rateForm">
                <div class="form-row">
                    <mat-form-field>
                        <mat-label>Rate</mat-label>
                        <input matInput formControlName="static" placeholder="$" />
                    </mat-form-field>
                </div>
            </form>
        </mat-tab>
        <mat-tab label="Dynamic">
            <app-rate-dynamic-subeditor />
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

    rateForm: FormGroup;
    
    constructor(private fb: FormBuilder) {
        this.rateForm = this.fb.group({
            rate: [''],
        });
    }
}