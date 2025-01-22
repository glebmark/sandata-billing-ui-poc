import { Routes } from '@angular/router';
import { ViewsPageComponent } from './views-page/views-page.component';
import { RatePageComponent } from './rate-page/rate-page.component';

export const routes: Routes = [
  { path: 'views', component: ViewsPageComponent },
  { path: 'rate', component: RatePageComponent },
//   { path: '', redirectTo: '/views', pathMatch: 'full' }
];
