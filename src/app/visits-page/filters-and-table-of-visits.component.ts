import { Component, ViewChild } from "@angular/core";
import { FiltersOfVisitsComponent } from "./filters-of-visits.component";
import { TableOfVisitsComponent } from "./table-of-visits.component";
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: "app-filters-and-table-of-visits",
    template: `
    <div>
        <app-filters-of-visits></app-filters-of-visits>
        <app-table-of-visits></app-table-of-visits>
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
            <ng-container matColumnDef="clientName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Client Name </th>
                <td mat-cell *matCellDef="let element"> {{element.clientName}} </td>
            </ng-container>
            <ng-container matColumnDef="serviceBeginDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Service Begin Date </th>
                <td mat-cell *matCellDef="let element"> {{element.serviceBeginDate}} </td>
            </ng-container>
            <ng-container matColumnDef="serviceEndDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Service End Date </th>
                <td mat-cell *matCellDef="let element"> {{element.serviceEndDate}} </td>
            </ng-container>
            <ng-container matColumnDef="units">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Units </th>
                <td mat-cell *matCellDef="let element"> {{element.units}} </td>
            </ng-container>
            <ng-container matColumnDef="service">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Service </th>
                <td mat-cell *matCellDef="let element"> {{element.service}} </td>
            </ng-container>
            <ng-container matColumnDef="payer">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Payer </th>
                <td mat-cell *matCellDef="let element"> {{element.payer}} </td>
            </ng-container>
            <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                <td mat-cell *matCellDef="let element"> {{element.status}} </td>
            </ng-container>
            <ng-container matColumnDef="elapsedDays">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Elapsed Days </th>
                <td mat-cell *matCellDef="let element"> {{element.elapsedDays}} </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    </div>
    `,
    imports: [FiltersOfVisitsComponent, TableOfVisitsComponent, MatTableModule, MatSortModule]
})
export class FiltersAndTableOfVisitsComponent {
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = ['clientName', 'serviceBeginDate', 'serviceEndDate', 'units', 'service', 'payer', 'status', 'elapsedDays'];

    dataSource = new MatTableDataSource(ELEMENT_DATA);

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }
}

const ELEMENT_DATA = [
    {clientName: 'John Doe', serviceBeginDate: '2023-01-01', serviceEndDate: '2023-03-10', units: 5, service: 'T1019_02', payer: 'DHCFP', status: 'Approved', elapsedDays: 452},
    {clientName: 'Jane Smith', serviceBeginDate: '2023-02-15', serviceEndDate: '2023-04-20', units: 10, service: 'S9123', payer: 'Medicaid', status: 'Pending', elapsedDays: 300},
    {clientName: 'Alice Johnson', serviceBeginDate: '2023-03-10', serviceEndDate: '2023-05-15', units: 8, service: 'H2015', payer: 'Medicare', status: 'Denied', elapsedDays: 200},
    {clientName: 'Bob Brown', serviceBeginDate: '2023-04-01', serviceEndDate: '2023-06-10', units: 12, service: 'T1019_01', payer: 'Private', status: 'Approved', elapsedDays: 150},
    {clientName: 'Charlie Davis', serviceBeginDate: '2023-05-05', serviceEndDate: '2023-07-20', units: 7, service: 'S9124', payer: 'Medicaid', status: 'Pending', elapsedDays: 100},
];