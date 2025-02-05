import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
    selector: "app-filters-and-table-of-visits",
    // TODO fix checkbox menu so it won't be closed after one click on checkbox
    template: `
    <div>
        <button mat-button [matMenuTriggerFor]="menu">Toggle Columns</button>
        <mat-menu #menu="matMenu">
            <mat-checkbox *ngFor="let column of allColumns" [(ngModel)]="column.visible" (change)="updateDisplayedColumns()"> {{column.name}} </mat-checkbox>
        </mat-menu>
        <div class="filter-container">
            <ng-container *ngFor="let column of allColumns">
                <mat-form-field class="filter-field" *ngIf="column.visible && column.def !== 'elapsedDays'">
                    <input matInput *ngIf="column.def !== 'serviceBeginDate' && column.def !== 'serviceEndDate' && column.def !== 'payer'" [(ngModel)]="column.filterValue" (keyup)="applyFilter($event, column.def)" placeholder="{{column.name}}">
                    <!-- TODO fix date input -->
                    <input matInput *ngIf="column.def === 'serviceBeginDate' || column.def === 'serviceEndDate'" type="date" [(ngModel)]="column.filterValue" (keyup)="applyFilter($event, column.def)" placeholder="{{column.name}}">
                    <mat-select *ngIf="column.def === 'payer'" [(ngModel)]="column.filterValue" (selectionChange)="applyFilter($event, column.def)" placeholder="{{column.name}}">
                        <mat-option value="">None</mat-option>
                        <mat-option value="DHCFP">DHCFP</mat-option>
                    </mat-select>
                </mat-form-field>
            </ng-container>
        </div>
        <button mat-button (click)="clearFilters()">Clear Filters</button>
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
            <ng-container matColumnDef="link">
                <th mat-header-cell *matHeaderCellDef> Link </th>
                <td mat-cell *matCellDef="let element"> <a [routerLink]="['/visit', element.id]">View</a> </td>
            </ng-container>
            <ng-container *ngFor="let column of allColumns">
                <ng-container *ngIf="column.visible" [matColumnDef]="column.def">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.name}} </th>
                    <td mat-cell *matCellDef="let element"> {{element[column.def]}} </td>
                </ng-container>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="['link'].concat(displayedColumns)"></tr>
            <tr mat-row *matRowDef="let row; columns: ['link'].concat(displayedColumns);"></tr>
        </table>
    </div>
    `,
    styles: [`
        .filter-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 10px;
        }
        .filter-field {
            flex: 1 1 200px;
        }
    `],
    imports: [MatTableModule, MatSortModule, MatCheckboxModule, MatButtonModule, MatMenuModule, FormsModule, CommonModule, MatInputModule, MatSelectModule, RouterModule]
})
export class FiltersAndTableOfVisitsComponent implements AfterViewInit {
    // fix filters, when type in into multiple filters
    // they sometimes do not work together and work separately
    @ViewChild(MatSort) sort!: MatSort;

    allColumns = [
        { name: 'First Name', def: 'firstName', visible: true, filterValue: '' },
        { name: 'Last Name', def: 'lastName', visible: true, filterValue: '' },
        { name: 'Service Begin Date', def: 'serviceBeginDate', visible: true, filterValue: '' },
        { name: 'Service End Date', def: 'serviceEndDate', visible: true, filterValue: '' },
        { name: 'Units', def: 'units', visible: true, filterValue: '' },
        { name: 'Service', def: 'service', visible: true, filterValue: '' },
        { name: 'Payer', def: 'payer', visible: true, filterValue: '' },
        { name: 'Status', def: 'status', visible: true, filterValue: '' },
        { name: 'Elapsed Days', def: 'elapsedDays', visible: true, filterValue: '' }
    ];

    displayedColumns: string[] = this.allColumns.map(column => column.def);

    dataSource = new MatTableDataSource(ELEMENT_DATA);

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    updateDisplayedColumns() {
        this.displayedColumns = this.allColumns.filter(column => column.visible).map(column => column.def);
    }

    applyFilter(event: any, column: string) {
        const filterValue = event.target ? event.target.value.trim().toLowerCase() : event.value.trim().toLowerCase();
        const columnToUpdate = this.allColumns.find(col => col.def === column);
        if (columnToUpdate) {
            columnToUpdate.filterValue = filterValue;
        }

        this.dataSource.filterPredicate = (data: any) => {
            return this.allColumns.every(col => {
                if (!col.filterValue) {
                    return true;
                }
                const dataStr = data[col.def] ? data[col.def].toString().toLowerCase() : '';
                return dataStr.indexOf(col.filterValue) !== -1;
            });
        };
        this.dataSource.filter = JSON.stringify(this.allColumns.map(col => col.filterValue));
    }

    clearFilters() {
        this.allColumns.forEach(column => column.filterValue = '');
        this.dataSource.filter = '';
    }
}

const ELEMENT_DATA = [
    {id: 1, firstName: 'John', lastName: 'Doe', serviceBeginDate: '2023-01-01', serviceEndDate: '2023-03-10', units: 5, service: 'T1019_02', payer: 'DHCFP', status: 'Approved', elapsedDays: 452},
    {id: 2, firstName: 'Jane', lastName: 'Smith', serviceBeginDate: '2023-02-15', serviceEndDate: '2023-04-20', units: 10, service: 'S9123', payer: 'Medicaid', status: 'Pending', elapsedDays: 300},
    {id: 3, firstName: 'Alice', lastName: 'Johnson', serviceBeginDate: '2023-03-10', serviceEndDate: '2023-05-15', units: 8, service: 'H2015', payer: 'Medicare', status: 'Denied', elapsedDays: 200},
    {id: 4, firstName: 'Bob', lastName: 'Brown', serviceBeginDate: '2023-04-01', serviceEndDate: '2023-06-10', units: 12, service: 'T1019_01', payer: 'Private', status: 'Approved', elapsedDays: 150},
    {id: 5, firstName: 'Charlie', lastName: 'Davis', serviceBeginDate: '2023-05-05', serviceEndDate: '2023-07-20', units: 7, service: 'S9124', payer: 'Medicaid', status: 'Pending', elapsedDays: 100},
];

// TODO rename views to visits