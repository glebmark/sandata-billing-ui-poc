import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsPageComponent } from './views-page/views-page.component';
import { RatePageComponent } from './rate-page/rate-page.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    ViewsPageComponent,
    RatePageComponent,
    MatTabsModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule {}
