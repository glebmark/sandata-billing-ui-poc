import { Component } from "@angular/core";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RateSubeditorComponent } from "./rate-subeditor.component";
import { CommonModule } from '@angular/common';
import { RateViewerComponent } from "./rate-viewer/rate-viewer.component";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

export enum RateType {
    GeneralRate = 'generalRate',
    WeekendRate = 'weekendRate',
    HolidayRate = 'holidayRate'
}

@Component({
    selector: "app-rates-list-viewer",
    template: `
        <table mat-table [dataSource]="dataSource" multiTemplateDataRows class="mat-elevation-z8">
            <ng-container matColumnDef="evvIdentifier">
                <th mat-header-cell *matHeaderCellDef> EVV Identifier </th>
                <td mat-cell *matCellDef="let element"> {{element.evvIdentifier}} </td>
            </ng-container>

            <ng-container matColumnDef="eventCode">
                <th mat-header-cell *matHeaderCellDef> Event Code </th>
                <td mat-cell *matCellDef="let element"> {{element.eventCode}} </td>
            </ng-container>

            <ng-container matColumnDef="effectiveDate">
                <th mat-header-cell *matHeaderCellDef> Effective Date </th>
                <td mat-cell *matCellDef="let element"> {{element.effectiveDate}} </td>
            </ng-container>

            <ng-container matColumnDef="service">
                <th mat-header-cell *matHeaderCellDef> Service </th>
                <td mat-cell *matCellDef="let element"> {{element.service}} </td>
            </ng-container>

            <ng-container matColumnDef="rate">
                <th mat-header-cell *matHeaderCellDef> Rate </th>
                <td mat-cell *matCellDef="let element"> {{element.rate}} </td>
            </ng-container>

            <ng-container matColumnDef="copay">
                <th mat-header-cell *matHeaderCellDef> Copay </th>
                <td mat-cell *matCellDef="let element"> {{element.copay}} </td>
            </ng-container>

            <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef> Description </th>
                <td mat-cell *matCellDef="let element"> {{element.description}} </td>
            </ng-container>

            <ng-container matColumnDef="details">
                <td mat-cell *matCellDef="let element" [attr.colspan]="displayedColumns.length">
                    <div class="example-element-detail"
                         [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
                        <div class="example-element-diagram">
                            <form [formGroup]="rateForm">
                                <app-rate-viewer formGroupName="rateViewerForm" />
                                <div formArrayName="rateSubeditorForms">
                                    <div *ngFor="let rateSubeditorForm of rateSubeditorForms.controls; let i = index">
                                        <app-rate-dynamic-subeditor [formGroupIndex]="i" [rateType]="rateTypes[i]" ></app-rate-dynamic-subeditor>
                                    </div>
                                </div>
                                <button mat-raised-button color="primary" (click)="getFormInput()">Save</button>
                                <button mat-raised-button color="primary" (click)="getFormInput()">Save as new</button>
                                <button mat-raised-button color="primary">Delete</button> <!-- TODO implement delete action -->
                                <button mat-raised-button color="primary" (click)="onCancel()">Cancel</button>
                            </form>
                        </div>
                    </div>
                </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let element; columns: displayedColumns;"
                class="example-element-row"
                [class.example-expanded-row]="expandedElement == element"
                (click)="expandedElement = expandedElement === element ? null : element">
            </tr>
            <tr mat-row *matRowDef="let row; columns: ['details'];" class="example-detail-row"></tr>
        </table>
    `,
    styles: [`
        .example-element-row {
            cursor: pointer;
        }
        .example-element-detail {
            overflow: hidden;
            display: flex;
        }
        .example-element-diagram {
            min-width: 80px;
            border: 2px solid black;
            padding: 8px;
            margin: 8px 0;
        }
        .example-detail-row {
            height: 0;
        }
        .example-element-row:not(.example-expanded-row):hover {
            background: #f5f5f5;
        }
    `],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        ReactiveFormsModule,
        RateSubeditorComponent,
        RateViewerComponent
    ]
})
export class RatesListViewerComponent {

    constructor(private http: HttpClient) {
        this.getRateData()
    }

    welcome = "Welcome to the Rates List Viewer!";

    displayedColumns: string[] = ['evvIdentifier', 'eventCode', 'effectiveDate', 'service', 'rate', 'copay', 'description'];

    dataSource = new MatTableDataSource(ELEMENT_DATA); // 

    expandedElement: RateElement | null = null;

    rateTypes = [RateType.GeneralRate, RateType.WeekendRate, RateType.HolidayRate];

    rateForm = new FormGroup({
        rateViewerForm: new FormGroup({
            evvIdentifier: new FormControl(''),
            eventCode: new FormControl(''),
            effectiveDate: new FormControl(''),
            service: new FormControl(''),
            modifier: new FormControl(''),
            revcode: new FormControl(''),
            description: new FormControl(''),
            payer: new FormControl(''),
            program: new FormControl(''),
            memberId: new FormControl(''),
            tags: new FormControl(''),
            copayType: new FormControl(''),
            copayRate: new FormControl(''),
            claimType: new FormControl(''),
            rollUpType: new FormControl(''),
            placeOfService: new FormControl('')
        }),
        rateSubeditorForms: new FormArray([
            this.createRateSubeditorForm(this.rateTypes[0]),
            this.createRateSubeditorForm(this.rateTypes[1]),
            this.createRateSubeditorForm(this.rateTypes[2]),
        ])
    });

    createRateSubeditorForm(rateType: string): FormGroup {
        return new FormGroup({
            rateType: new FormControl(rateType),
            staticRate: new FormControl(''),
            dynamicUnits: new FormControl(''),
            dynamicRate: new FormControl(''),
            dynamicModifier: new FormControl(''),
        })
    }

    get rateSubeditorForms(): FormArray {
        return this.rateForm.get('rateSubeditorForms') as FormArray;
    }

    getFormInput(): void {
        console.log('Data from forms in Parent:');
        console.log(this.rateForm.value);

        // TODO replace 96010 with id
        // pass url from envs
        // change payload to proper meta

        sendFormToServer(this.rateForm);

        const params1 = new HttpParams()
        .set('_format', 'json')
        .set('_m', 'aidbox.billing.rpc/save-charge-item-def')

        this.http.post(`http://localhost:8080/fhir/Organization/96010/rpc`,
            this.rateForm.value, 
            { params: params1 }
        ).subscribe({
            next: response => {
                console.log('Form submitted successfully', response);
                // const parsedData = this.parseRateFormData(response);
                // this.rateForm.setValue(parsedData);
            },
            error: error => {
                console.error('Error submitting form', error);
            }
        });

        const params2 = new HttpParams()
            .set('_format', 'json')
            .set('_m', 'aidbox.billing.rpc/fetch-shift-tracking-shifts');

        this.http.post(`http://localhost:8080/fhir/Organization/96010/rpc`, 
            this.rateForm.value, { params: params2 }).subscribe({
            next: response => {
            console.log('Form submitted successfully', response);
            // const parsedData = this.parseRateFormData(response);
            // this.rateForm.setValue(parsedData);
            },
            error: error => {
            console.error('Error submitting form', error);
            }
        });

        const params3 = new HttpParams()
            .set('_format', 'json')
            .set('_m', 'billing.rpc/get-rates');

        this.http.post(`http://localhost:8080/fhir/Organization/96010/rpc`, 
            this.rateForm.value, { params: params3 }).subscribe({
            next: response => {
            console.log('Form submitted successfully', response);
            // const parsedData = this.parseRateFormData(response);
            // this.rateForm.setValue(parsedData);
            },
            error: error => {
            console.error('Error submitting form', error);
            }
        });
    }

    onCancel(): void {
        this.expandedElement = null;
    }

    parseRateFormData(response: any) {
        const rateData = response.result.rates[0];
        const rateFormValue = {
          rateViewerForm: {
            evvIdentifier: rateData.identifier[0].value,
            eventCode: rateData.data['event-code'] || '',
            effectiveDate: rateData.effectiveDate,
            service: rateData.code.coding[0].code,
            modifier: rateData.data.modifier || '',
            revcode: rateData.data.revcode || '',
            description: rateData.data.description || '',
            payer: rateData.payor.identifier.value,
            program: rateData.data.program || '',
            memberId: rateData.data['member-id'] || '',
            tags: rateData.data.tags || '',
            copayType: rateData.data['copay-type'] || '',
            copayRate: rateData.data['copay-rate'] || '',
            claimType: rateData.data['claim-type'] || '',
            rollUpType: rateData.data['roll-up-type'] || '',
            placeOfService: rateData.placeOfService || ''
          },
          rateSubeditorForms: [
            {
              rateType: 'generalRate',
              staticRate: rateData.data.rate['static-rate'] || '',
              dynamicUnits: rateData.data.rate['dynamic-units'] || '',
              dynamicRate: rateData.data.rate['dynamic-rate'] || '',
              dynamicModifier: rateData.data.rate['dynamic-modifier'] || ''
            },
            {
              rateType: 'weekendRate',
              staticRate: rateData.data['weekend-rate']['static-rate'] || '',
              dynamicUnits: rateData.data['weekend-rate']['dynamic-units'] || '',
              dynamicRate: rateData.data['weekend-rate']['dynamic-rate'] || '',
              dynamicModifier: rateData.data['weekend-rate']['dynamic-modifier'] || ''
            },
            {
              rateType: 'holidayRate',
              staticRate: rateData.data['holiday-rate']['static-rate'] || '',
              dynamicUnits: rateData.data['holiday-rate']['dynamic-units'] || '',
              dynamicRate: rateData.data['holiday-rate']['dynamic-rate'] || '',
              dynamicModifier: rateData.data['holiday-rate']['dynamic-modifier'] || ''
            }
          ]
        };
        return rateFormValue;
      }

      getRateData() {
        const params = new HttpParams()
          .set('_format', 'json')
          .set('_m', 'billing.rpc/get-rates');

        const headers = new HttpHeaders()
            .set('Accept', 'application/json')
            .set('cache-control', 'no-cache')
            .set('content-type', 'application/json')
            .set('x-auth-method', 'aspxauth');

        const body = {"method":"billing.rpc/get-rates","params":{"payor":"dsfsf","as-of-date":"2025-02-10"}}
    
        this.http.request('POST', `http://localhost:8080/fhir/Organization/96010/rpc`, 
            { params, headers, body, withCredentials: true }).subscribe({
          next: response => {
            console.log('Form submitted successfully', response);
            const parsedData = this.parseRateFormData(response);
            this.rateForm.setValue(parsedData);

            console.log("Rate data:");
            console.log(this.rateForm.value)
          },
          error: error => {
            console.error('Error submitting form', error);
          }
        });
      }
}

export interface RateElement {
    evvIdentifier: string;
    eventCode: string;
    effectiveDate: string;
    service: string;
    rate: string;
    copay: string;
    description: string;
}

const ELEMENT_DATA: RateElement[] = [
    {evvIdentifier: 'ID1', eventCode: 'E1', effectiveDate: '2023-01-01', service: 'Service1', rate: '100', copay: '10', description: 'Description1'},
    {evvIdentifier: 'ID2', eventCode: 'E2', effectiveDate: '2023-02-01', service: 'Service2', rate: '200', copay: '20', description: 'Description2'},
    {evvIdentifier: 'ID3', eventCode: 'E3', effectiveDate: '2023-03-01', service: 'Service3', rate: '300', copay: '30', description: 'Description3'},
];

const sendFormToServer = (form: FormGroup) => {
    console.log(form.value);
}