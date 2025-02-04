import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start-page',
  template: `<div>
    <h1>Welcome to the Sandata Billing UI</h1>
    <nav>
      <ul>
        <li><a routerLink="/views">Views Page</a></li>
        <li><a routerLink="/rate">Rate Page</a></li>
      </ul>
    </nav>
    <router-outlet />
  </div>`,
  imports: [RouterLink, RouterOutlet],
})
export class StartPageComponent {}

// TODO make backlinks to startpage from rates and views
// add "pwd" of pages