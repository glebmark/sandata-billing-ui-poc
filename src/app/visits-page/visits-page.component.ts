import { Component, OnInit } from '@angular/core';
import { SyncComponent } from './sync.component';
import { CommonModule } from '@angular/common';
import { FiltersAndTableOfVisitsComponent } from './filters-and-table-of-visits.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-visits-page',
  template: `
    <div>
    <button mat-raised-button color="primary" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
    </button>
      <app-sync />
      <app-filters-and-table-of-visits />
    </div>
  `,
  imports: [CommonModule, SyncComponent, FiltersAndTableOfVisitsComponent, MatIconModule]
})
export class VisitsPageComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  visits: any;

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['']);
  }

  getVisits() {

    const url = 'http://localhost:8080/fhir/Organization/96010/rpc';

    const params = new HttpParams()
      .set('_format', 'json')
      .set('_m', 'aidbox.billing.rpc/get-encounters');

    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('cache-control', 'no-cache')
    .set('content-type', 'application/json')
    .set('x-auth-method', 'aspxauth');

    const body = {"method":"aidbox.billing.rpc/get-encounters","params":{"filters":{"status":"Billable"},"sorting":{"path":["start-date"],"dir":"desc"},"pagination":{"page-num":0,"per-page":20}}}

    this.http.request('POST', url, { params, body, headers, withCredentials: true }).subscribe({
      next: response => {
        this.visits = response;
        console.log('Visit details fetched successfully', response);
      },
      error: error => {
        console.error('Error fetching visit details', error);
      }
    });
  }
}

// LAYOUT:

// parent component visits-page
// -- sync
// -- filters + table of visits
// ---- may be: filters
// ---- may be: table of visits

// under routes: visit details


// COMPONENTS:

// sync: two inputs - from and to, and button sync with one request

// filters which applied on the go 
// with clear button

// mat-table with rows of Visits
// checkboxes culumn - when user clicks, we show dialog of saving batches
// button which shows list of columns and adds possibility to turn them on/off

// pages with pagination

