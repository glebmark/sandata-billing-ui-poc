import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartPageComponent],
  template: `<app-start-page />`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sandata-billing-ui-poc';
}
