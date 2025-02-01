import { Component } from "@angular/core";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RateDynamicSubeditorComponent } from "./rate-dynamic-subeditor.component";
import { CommonModule } from '@angular/common';
import { RateViewerComponent } from "./rate-viewer/rate-viewer.component";

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
                                <app-rate-viewer />
                                <div formArrayName="rateSubeditorForms">

                                    <!-- @for (rateSubeditorForm of rateSubeditorForms; track rateSubeditorForm.id) {
                                        <app-rate-dynamic-subeditor [formGroupIndex]="i" [rateType]="rateTypes[i]" />
                                    } -->

                                    <div *ngFor="let rateSubeditorForm of rateSubeditorForms.controls; let i = index">
                                        <app-rate-dynamic-subeditor [formGroupIndex]="i" [rateType]="rateTypes[i]" />
                                    </div>

                                </div>
                                <!-- <button type="submit" (click)="onSubmit()">Submit</button> -->
                                <button mat-raised-button color="primary" (click)="getFormInput()">Save</button>
                                <button mat-raised-button color="primary">Save as new</button>
                                <button mat-raised-button color="primary">Delete</button>
                                <button mat-raised-button color="primary">Cancel</button>
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
        RateDynamicSubeditorComponent,
        ReactiveFormsModule,
        RateViewerComponent
    ]
})
export class RatesListViewerComponent {
    welcome = "Welcome to the Rates List Viewer!";

    displayedColumns: string[] = ['evvIdentifier', 'eventCode', 'effectiveDate', 'service', 'rate', 'copay', 'description'];

    dataSource = new MatTableDataSource(ELEMENT_DATA);

    expandedElement: RateElement | null = null;

    rateTypes = ['generalRate', 'weekendRate','holidayRate'];

    // rateForm: FormGroup;

    rateForm = new FormGroup({
        // TODO add rateViewer component's group form
        rateSubeditorForms: new FormArray([
            this.createRateSubeditorForm(this.rateTypes[0]),
            this.createRateSubeditorForm(this.rateTypes[1]),
            this.createRateSubeditorForm(this.rateTypes[2]),
        ])
    });

    createRateSubeditorForm(rateType: string): FormGroup {
        return new FormGroup({
            name: new FormControl(rateType), // why?
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