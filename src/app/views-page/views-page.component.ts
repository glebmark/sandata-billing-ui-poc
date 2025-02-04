import { Component, OnInit } from '@angular/core';
import { SyncComponent } from './sync.component';

@Component({
  selector: 'app-views-page',
  template: `
    <div>
      Views Page
      <app-sync></app-sync>
    </div>
  `,
  imports: [SyncComponent]
})
export class ViewsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// LAYOUT:

// parent component views-page
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

