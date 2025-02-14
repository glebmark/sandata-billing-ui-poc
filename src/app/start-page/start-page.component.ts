import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start-page',
  template: `<div>
    <h1>Welcome to the Sandata Billing UI</h1>
    <nav>
      <ul>
        <li><a routerLink="/visits">Visit Page</a></li>
        <li><a routerLink="/rate">Rate Page</a></li>
      </ul>
    </nav>
    <router-outlet />
  </div>`,
  imports: [RouterLink, RouterOutlet],
})
export class StartPageComponent {}

// TODO make backlinks to startpage from rates and visits
// add "pwd" of pages

// - add auth to endpoint calls



// review:
// benifits:
// 1) when you create a form (not complex with multiple steps)
// you don't need to use any state
// like in React because Reactive Forms inherently manage their own state
// 2) Angular has component-based structure which gives us low coupling
// and then it leads to high cohesion (components can be mixed and many ways)
// 3) modules structure gives us more clear and coherent structure of app
// because we can describe different pages / components, services and etc
// and group them into modules
// 4) DI gives us ability to decouple entities and inject them 
// when we need them anywhere in the app
// 5) less "type gymnastics" than in React. Angular is made with TS
// and it feels like all typisation is more natural and in React it more
// like implementing TS on the top of legacy JS (I mean internal 
// React's JS code it built on)
// 6) Angular has a lot of built-in features like routing, forms, animations, etc
// but in React there multiple libraries for each of these features
// developed by different teams which can lead to inconsistency and
// increased maintenance
// 7) Angular has a lot of built-in directives like ngIf, ngFor, etc
// so when we need to display multiple rows or components we can do it
// by using Angular's directives directly in HTML template 
// rather than iterate manually with TS like in React
// 8) Angular has two-way data flow meaning changes in UI are reflected
// in the model and vice versa. In React we need to use state and setState
// (during development of this POC I have never used any state, it all
// was done with Reactive Forms)

// Alternatives to Angular Material library:
// 1) https://ng.ant.design/components/form/en Ant design is based on Angular Forms
// so all functionality of Reactive Forms with internal state managment
// and other features will be available
// 2) see https://chatgpt.com/c/67a5d5c7-aaec-800c-a085-2045fbce1e7e

// components = object model
// reactivity = FP



// questions:
// is it possible to render HTML dynamicly after we've fetched data from server?
// A: yes, by using innerHTML + Using ng-container and *ngIf + 2 more methods

// is it possible to pass custom HTML inside Angular's table?
// A: yes, Using ng-template for Custom Cells

// is it possible to add custom logic when we for example click on tab
// A: yes, Using a Simple ngClass and Click Event

// is it possible to check out what is going on inside data flow from UI to data in class (how to debug)
// A: yes, ngModelChange + Angular DevTools + getter and setter