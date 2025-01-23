import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ServiceRatePageComponent } from './service-rate.component';

@Component({
  selector: 'app-rate-page',
  template: `
    <mat-tab-group>
      <mat-tab label="Service Rates">
        <!-- TODO add doc/flat view switcher -->
        <app-service-rate-page />
      </mat-tab>
      <mat-tab label="Exchange Profiles">
        <!-- Content for Exchange Profiles -->
      </mat-tab>
    </mat-tab-group>
  `,
imports: [MatTabsModule, ServiceRatePageComponent]
})
export class RatePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
