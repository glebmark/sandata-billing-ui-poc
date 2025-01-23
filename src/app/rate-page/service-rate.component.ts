import { Component, OnInit, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ServiceSpecificRatePageComponent } from './specific-rate.component';

@Component({
    selector: 'app-service-rate-page',
    template: `
        Service Rates (doc view)
        <mat-tab-group>
            <mat-tab label="Base Rates">
                <app-service-specific-rate-page [isBase]="true" />
            </mat-tab>
            <mat-tab label="DHCFP">
                <app-service-specific-rate-page [isBase]="false" />
            </mat-tab>
            <mat-tab label="WELLSKY">
                <app-service-specific-rate-page [isBase]="false" />
            </mat-tab>
        </mat-tab-group>
    `,
    imports: [MatTabsModule, ServiceSpecificRatePageComponent]
})
export class ServiceRatePageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
