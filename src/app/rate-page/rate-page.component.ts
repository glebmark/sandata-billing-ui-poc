import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ServiceRatePageComponent } from './service-rate.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-page',
  template: `
    <button mat-raised-button color="primary" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
    </button>
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
imports: [MatTabsModule, ServiceRatePageComponent, MatIconModule]
})
export class RatePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['']);
  }

}
