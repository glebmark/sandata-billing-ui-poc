import { Component, OnInit } from '@angular/core';
import { SyncComponent } from './sync.component';
import { CommonModule } from '@angular/common';
import { FiltersAndTableOfVisitsComponent } from './filters-and-table-of-visits.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['']);
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

