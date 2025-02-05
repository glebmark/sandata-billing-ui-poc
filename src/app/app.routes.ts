import { Routes } from '@angular/router';
import { ViewsPageComponent } from './visits-page/views-page.component';
import { RatePageComponent } from './rate-page/rate-page.component';
import { StartPageComponent } from './start-page/start-page.component';
import { VisitDetailsComponent } from './visits-page/visit-details/visit-details.component';

export const routes: Routes = [
  { path: '', component: StartPageComponent, pathMatch: 'full' },
  { path: 'views', component: ViewsPageComponent },
  { path: 'rate', component: RatePageComponent },
  { path: 'visit/:id', component: VisitDetailsComponent }
];
