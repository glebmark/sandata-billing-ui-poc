import { Component, Input, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { RatesListViewerComponent } from './rates-list-viewer.component';

@Component({
  selector: 'app-service-specific-rate-page',
  template: `
    <mat-form-field appearance="fill">
        <mat-label>Choose a date</mat-label>
        <input matInput [matDatepicker]="picker" placeholder="MM/DD/YYYY">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
    <!-- TODO add two buttons: copy rate and add rate -->
    @if (isBase) {
        <app-rates-list-viewer />
    } @else {
        <!-- TODO add to both tabs "Payor specific rates. Effective date:" 
         with switcher to Client specific rates-->
        <mat-tab-group>
            <mat-tab label="Any program">
                <app-rates-list-viewer />
            </mat-tab>
            <mat-tab label="EPD">
                <app-rates-list-viewer />
            </mat-tab>
        </mat-tab-group>
    }`,

   imports: [
    MatNativeDateModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatTabsModule,
    RatesListViewerComponent]
})
export class ServiceSpecificRatePageComponent implements OnInit {

  @Input() isBase!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
