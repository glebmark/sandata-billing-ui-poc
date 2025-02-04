import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsPageComponent } from './visits-page/views-page.component';
import { RatePageComponent } from './rate-page/rate-page.component';

const routes: Routes = [
  { path: 'views', component: ViewsPageComponent },
  { path: 'rate', component: RatePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
