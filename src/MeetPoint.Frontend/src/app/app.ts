import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavTopComponent } from './main-nav-top.component/main-nav-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MainNavTopComponent],
  template: `<app-main-nav-top /> <router-outlet />`,
  styles: ``,
})
export class App {}
