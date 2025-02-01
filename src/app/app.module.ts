import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsPageComponent } from './views-page/views-page.component';
import { RatePageComponent } from './rate-page/rate-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RateDynamicSubeditorComponent } from './rate-page/rate-dynamic-subeditor.component';
import { RatesListViewerComponent } from './rate-page/rates-list-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RateViewerComponent } from './rate-page/rate-viewer/rate-viewer.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    AppComponent,
    ViewsPageComponent,
    RatePageComponent,
    RatesListViewerComponent,
    RateDynamicSubeditorComponent,
    RateViewerComponent
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule {}
