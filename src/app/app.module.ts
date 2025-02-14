import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitsPageComponent } from './visits-page/visits-page.component';
import { RatePageComponent } from './rate-page/rate-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RateSubeditorComponent } from './rate-page/rate-subeditor.component';
import { RatesListViewerComponent } from './rate-page/rates-list-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RateViewerComponent } from './rate-page/rate-viewer/rate-viewer.component';
import { SyncComponent } from './visits-page/sync.component';
import { VisitDetailsComponent } from './visits-page/visit-details/visit-details.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    AppComponent,
    RatePageComponent,
    RatesListViewerComponent,
    RateSubeditorComponent,
    RateViewerComponent,
    SyncComponent,
    VisitsPageComponent,
    VisitDetailsComponent
  ],
  providers: [CookieService],
})
export class AppModule {}
