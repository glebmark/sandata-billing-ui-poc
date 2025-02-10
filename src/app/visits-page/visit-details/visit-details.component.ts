import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visit-details',
  template: `
    <div>
      <h2>Visit Details</h2>
      <button mat-raised-button color="primary" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <button mat-button (click)="getVisitDetails()">Get Visit Details</button>
      <div class="info-row">
        <div>Last Updated: {{ lastUpdated }}</div>
        <div>Total Billed: {{ totalBilled | currency:'USD' }}</div>
        <div>Exceptions: {{ exceptions }}</div>
      </div>
      <table mat-table [dataSource]="[visitDetails]" class="mat-elevation-z8" style="margin-bottom: 16px;">
        <ng-container matColumnDef="personalInfo">
          <th mat-header-cell *matHeaderCellDef> Personal Info </th>
          <td mat-cell *matCellDef="let element" style="vertical-align: top;">
            <div>First Name: {{element.firstName}}</div>
            <div>Last Name: {{element.lastName}}</div>
            <div>Birth Date: {{element.birthDate}}</div>
            <div>Address Line: {{element.addressLine}}</div>
            <div>Address Line 2: {{element.addressLine2}}</div>
            <div>City: {{element.city}}</div>
            <div>State: {{element.state}}</div>
            <div>Postal Code: {{element.postalCode}}</div>
            <div>Member ID: {{element.memberId}}</div>
            <div>Contact: {{element.contact}}</div>
          </td>
        </ng-container>
        <ng-container matColumnDef="additionalInfo">
          <th mat-header-cell *matHeaderCellDef> Additional Info </th>
          <td mat-cell *matCellDef="let element" style="vertical-align: top;">
            <div>Payer: {{element.payer}}</div>
            <div>Pre-auth: {{element.preAuth}}</div>
            <div>Diagnoses: {{element.diagnoses}}</div>
            <div>AMP Diagnoses: {{element.ampDiagnoses}}</div>
            <div>Employee NPI: {{element.employeeNpi}}</div>
            <div>Provider First Name: {{element.providerFirstName}}</div>
            <div>Provider Last Name: {{element.providerLastName}}</div>
            <div>Provider NPI: {{element.providerNpi}}</div>
          </td>
        </ng-container>
        <ng-container matColumnDef="companyInfo">
          <th mat-header-cell *matHeaderCellDef> Company Info </th>
          <td mat-cell *matCellDef="let element" style="vertical-align: top;">
            <div>Company Name: {{element.companyName}}</div>
            <div>NPI: {{element.npi}}</div>
            <div>TAX ID: {{element.taxId}}</div>
            <div>Taxonomy Code: {{element.taxonomyCode}}</div>
            <div>Provider ID: {{element.providerId}}</div>
            <div>Phone: {{element.phone}}</div>
            <div>Address Line: {{element.companyAddressLine}}</div>
            <div>Address Line 2: {{element.companyAddressLine2}}</div>
            <div>City: {{element.companyCity}}</div>
            <div>State: {{element.companyState}}</div>
            <div>Postal Code: {{element.companyPostalCode}}</div>
          </td>
        </ng-container>
        <ng-container matColumnDef="additionalVisitDetails">
          <th mat-header-cell *matHeaderCellDef> Additional Visit Details </th>
          <td mat-cell *matCellDef="let element" style="vertical-align: top;">
            <div>Program: {{element.program}}</div>
            <div>Service Begin Date: {{element.serviceBeginDate}}</div>
            <div>Service End Date: {{element.serviceEndDate}}</div>
            <div>Schedule Start Date: {{element.scheduleStartDate}}</div>
            <div>Schedule End Date: {{element.scheduleEndDate}}</div>
            <div>Elapsed Days: {{element.elapsedDays}}</div>
          </td>
        </ng-container>
        <!-- Add other columns as needed -->
        <tr mat-header-row *matHeaderRowDef="['personalInfo', 'additionalInfo', 'companyInfo', 'additionalVisitDetails']" style="margin-bottom: 16px;"></tr>
        <tr mat-row *matRowDef="let row; columns: ['personalInfo', 'additionalInfo', 'companyInfo', 'additionalVisitDetails'];" style="margin-bottom: 16px;"></tr>
      </table>
    </div>
    <h3>Service Lines</h3>
    <table mat-table [dataSource]="serviceLines" class="mat-elevation-z8" style="margin-bottom: 16px;">
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef> Date </th>
        <td mat-cell *matCellDef="let element"> {{element.date}} </td>
      </ng-container>
      <ng-container matColumnDef="service">
        <th mat-header-cell *matHeaderCellDef> Service </th>
        <td mat-cell *matCellDef="let element"> {{element.service}} </td>
      </ng-container>
      <ng-container matColumnDef="measure">
        <th mat-header-cell *matHeaderCellDef> Measure </th>
        <td mat-cell *matCellDef="let element"> {{element.measure}} </td>
      </ng-container>
      <ng-container matColumnDef="unitCalcRule">
        <th mat-header-cell *matHeaderCellDef> Unit Calc Rule </th>
        <td mat-cell *matCellDef="let element"> {{element.unitCalcRule}} </td>
      </ng-container>
      <ng-container matColumnDef="serviceRate">
        <th mat-header-cell *matHeaderCellDef> Service Rate </th>
        <td mat-cell *matCellDef="let element"> {{element.serviceRate}} </td>
      </ng-container>
      <ng-container matColumnDef="perUnitPrice">
        <th mat-header-cell *matHeaderCellDef> Per Unit Price </th>
        <td mat-cell *matCellDef="let element"> {{element.perUnitPrice}} </td>
      </ng-container>
      <ng-container matColumnDef="quantity">
        <th mat-header-cell *matHeaderCellDef> Quantity, # </th>
        <td mat-cell *matCellDef="let element"> {{element.quantity}} </td>
      </ng-container>
      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef> Price, $ </th>
        <td mat-cell *matCellDef="let element"> {{element.price}} </td>
      </ng-container>
      <ng-container matColumnDef="info">
        <th mat-header-cell *matHeaderCellDef> Info </th>
        <td mat-cell *matCellDef="let element"> {{element.info}} </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="['date', 'service', 'measure', 'unitCalcRule', 'serviceRate', 'perUnitPrice', 'quantity', 'price', 'info']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['date', 'service', 'measure', 'unitCalcRule', 'serviceRate', 'perUnitPrice', 'quantity', 'price', 'info'];"></tr>
    </table>
    <h3>No exceptions</h3>
  `,
  styles: [`
    .info-row {
      background-color: #e3f2fd;
      padding: 8px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
    }
  `],
  imports: [MatTableModule, CommonModule, MatIconModule],
  providers: [CurrencyPipe]
})
export class VisitDetailsComponent implements OnInit {
  visitId!: number;
  visitDetails: any = {
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '1980-01-01',
    addressLine: '123 Main St',
    addressLine2: '',
    city: 'Anytown',
    state: 'CA',
    postalCode: '12345',
    memberId: 'M123',
    contact: '555-1234',
    payer: 'DHCFP',
    preAuth: '123456',
    diagnoses: 'Diagnosis 1, Diagnosis 2',
    ampDiagnoses: 'AMP Diagnosis 1, AMP Diagnosis 2',
    employeeNpi: '1234567890',
    providerFirstName: 'Jane',
    providerLastName: 'Smith',
    providerNpi: '0987654321',
    companyName: 'HealthCare Inc.',
    npi: '1234567890',
    taxId: '987654321',
    taxonomyCode: '207Q00000X',
    providerId: 'P12345',
    phone: '555-6789',
    companyAddressLine: '456 Elm St',
    companyAddressLine2: 'Suite 100',
    companyCity: 'Othertown',
    companyState: 'NY',
    companyPostalCode: '67890',
    program: 'Medicaid',
    serviceBeginDate: '2023-01-01',
    serviceEndDate: '2023-12-31',
    scheduleStartDate: '2023-01-01',
    scheduleEndDate: '2023-12-31',
    elapsedDays: 365
  };
  lastUpdated: string = '2023-10-01T12:00:00Z'; // TODO parse last updated from getVisitDetails
  totalBilled: number = 1000;
  exceptions: number = 2;
  serviceLines = [
    {
      date: '2023-10-01',
      service: 'T1019',
      measure: '2 hr',
      unitCalcRule: '?',
      serviceRate: 'TODO link',
      perUnitPrice: 10,
      quantity: 10,
      price: 1000,
      info: '-'
    },
    // Add more service lines as needed
  ];

  constructor(
    private route: ActivatedRoute,  
    private router: Router) {}

  ngOnInit(): void {
    this.visitId = +this.route.snapshot.paramMap.get('id')!;
  }

  getVisitDetails() {

  }

  goBack() {
    this.router.navigate(['/visits']);
  }
}
