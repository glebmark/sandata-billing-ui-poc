import { Component } from '@angular/core';
import { StartPageComponent } from './start-page/start-page.component';

@Component({
  selector: 'app-root',
  template: `<app-start-page />`,
  styleUrl: './app.component.css',
  imports: [StartPageComponent],
})
export class AppComponent {
  title = 'sandata-billing-ui-poc';
}
