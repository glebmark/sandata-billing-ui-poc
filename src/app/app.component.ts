import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<div>
      <h1>Welcome to the Sandata Billing UI</h1>
      <nav>
        <ul>
          <li><a routerLink="/views">Views Page</a></li>
          <li><a routerLink="/rate">Rate Page</a></li>
        </ul>
      </nav>
      <router-outlet />
    </div>
  `,
  imports: [RouterLink, RouterOutlet],
  // template: `<app-start-page />`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sandata-billing-ui-poc';
}
