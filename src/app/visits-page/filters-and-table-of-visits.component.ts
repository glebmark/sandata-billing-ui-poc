import { Component, ViewChild } from "@angular/core";
import { FiltersOfVisitsComponent } from "./filters-of-visits.component";
import { TableOfVisitsComponent } from "./table-of-visits.component";
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: "app-filters-and-table-of-visits",
    // TODO fix checkbox menu so it won't be closed after one click on checkbox
    template: `
    <div>
        <app-filters-of-visits></app-filters-of-visits>
        <app-table-of-visits></app-table-of-visits>
        <button mat-button [matMenuTriggerFor]="menu">Toggle Columns</button>
        <mat-menu #menu="matMenu">
            <mat-checkbox *ngFor="let column of allColumns" [(ngModel)]="column.visible" (change)="updateDisplayedColumns()"> {{column.name}} </mat-checkbox>
        </mat-menu>
        <div class="filter-container">
            <ng-container *ngFor="let column of allColumns">
                <mat-form-field class="filter-field" *ngIf="column.visible">
                    <input matInput (keyup)="applyFilter($event, column.def)" placeholder="Filter {{column.name}}">
                </mat-form-field>
            </ng-container>
        </div>
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
            <ng-container *ngFor="let column of allColumns">
                <ng-container *ngIf="column.visible" [matColumnDef]="column.def">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.name}} </th>
                    <td mat-cell *matCellDef="let element"> {{element[column.def]}} </td>
                </ng-container>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    </div>
    `,
    imports: [FiltersOfVisitsComponent, TableOfVisitsComponent, MatTableModule, MatSortModule, MatCheckboxModule, MatButtonModule, MatMenuModule, FormsModule, CommonModule, MatInputModule]
})
export class FiltersAndTableOfVisitsComponent {
    @ViewChild(MatSort) sort!: MatSort;

    allColumns = [
        { name: 'Client Name', def: 'clientName', visible: true },
        { name: 'Service Begin Date', def: 'serviceBeginDate', visible: true },
        { name: 'Service End Date', def: 'serviceEndDate', visible: true },
        { name: 'Units', def: 'units', visible: true },
        { name: 'Service', def: 'service', visible: true },
        { name: 'Payer', def: 'payer', visible: true },
        { name: 'Status', def: 'status', visible: true },
        { name: 'Elapsed Days', def: 'elapsedDays', visible: true }
    ];

    displayedColumns: string[] = this.allColumns.map(column => column.def);

    dataSource = new MatTableDataSource(ELEMENT_DATA);

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    updateDisplayedColumns() {
        this.displayedColumns = this.allColumns.filter(column => column.visible).map(column => column.def);
    }

    applyFilter(keyboardEvent: KeyboardEvent, column: string) {

        const inputElement = keyboardEvent.target as HTMLInputElement;
        const filterValue = inputElement.value.trim().toLowerCase();

        this.dataSource.filterPredicate = (data: any, filter: string) => {
            const accumulator = (currentTerm: any, key: any) => {
                return key === column ? currentTerm + data[key] : currentTerm;
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            return dataStr.indexOf(filter) !== -1;
        };
        this.dataSource.filter = filterValue;
    }
}

const ELEMENT_DATA = [
    {clientName: 'John Doe', serviceBeginDate: '2023-01-01', serviceEndDate: '2023-03-10', units: 5, service: 'T1019_02', payer: 'DHCFP', status: 'Approved', elapsedDays: 452},
    {clientName: 'Jane Smith', serviceBeginDate: '2023-02-15', serviceEndDate: '2023-04-20', units: 10, service: 'S9123', payer: 'Medicaid', status: 'Pending', elapsedDays: 300},
    {clientName: 'Alice Johnson', serviceBeginDate: '2023-03-10', serviceEndDate: '2023-05-15', units: 8, service: 'H2015', payer: 'Medicare', status: 'Denied', elapsedDays: 200},
    {clientName: 'Bob Brown', serviceBeginDate: '2023-04-01', serviceEndDate: '2023-06-10', units: 12, service: 'T1019_01', payer: 'Private', status: 'Approved', elapsedDays: 150},
    {clientName: 'Charlie Davis', serviceBeginDate: '2023-05-05', serviceEndDate: '2023-07-20', units: 7, service: 'S9124', payer: 'Medicaid', status: 'Pending', elapsedDays: 100},
];