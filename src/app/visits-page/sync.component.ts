import { CommonModule } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: "app-sync",
    template: `
    <form [formGroup]="rateForm">
        <mat-form-field>
            <input matInput type="date" formControlName="from" placeholder="From">
        </mat-form-field>
        <mat-form-field>
            <input matInput type="date" formControlName="to" placeholder="To">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="sync()">Sync</button>
    </form>
    
    `,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule]
    })
export class SyncComponent {

    constructor(private http: HttpClient) {}

    rateForm = new FormGroup({
        from: new FormControl(''),
        to: new FormControl('')
    });

    sync(): void {
            console.log('Data from forms in Parent:');
            console.log(this.rateForm.value);
    
            // TODO replace 96010 with id
            // pass url from envs
            // change payload to proper meta
    
            const params1 = new HttpParams()
            .set('_format', 'json')
            .set('_m', 'aidbox.billing.rpc/save-charge-item-def')
    
            // TODO change to get
            this.http.post(`http://localhost:8080/fhir/Organization/96010/rpc`,
                this.rateForm.value, 
                { params: params1 }
            ).subscribe({
                next: response => {
                    console.log('Form submitted successfully', response);
                },
                error: error => {
                    console.error('Error submitting form', error);
                }
            });


            // TODO
            // sync data with output to visits-page
            // emit data here
        }
}