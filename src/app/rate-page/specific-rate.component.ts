import { Component, Input, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-service-specific-rate-page',
  template: `
    <mat-form-field appearance="fill">
        <mat-label>Choose a date</mat-label>
        <input matInput [matDatepicker]="picker" placeholder="MM/DD/YYYY">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
    
    @if (isBase) {
        <div>
            <h2>Base Rates</h2>
            <p>Base rates are the rates that are used to calculate the rates for the DHCFP and WELLSKY profiles.</p>
        </div>
    } @else {
        <div>
            <h2>DHCFP Rates</h2>
            <p>DHCFP rates are the rates that are used to calculate the rates for the DHCFP profile.</p>
        </div>
    }`,

   imports: [
    MatNativeDateModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule]
})
export class ServiceSpecificRatePageComponent implements OnInit {

  @Input() isBase!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
