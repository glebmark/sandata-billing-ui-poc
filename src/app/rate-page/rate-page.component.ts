import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-rate-page',
  template: `
    <mat-tab-group>
      <mat-tab label="Service Rates">
        <app-rate-page></app-rate-page>
      </mat-tab>
      <mat-tab label="Exchange Profiles">
        <!-- Content for Exchange Profiles -->
      </mat-tab>
    </mat-tab-group>
  `,
//   styleUrls: ['./rate-page.component.css']
imports: [MatTabsModule]
})
export class RatePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
