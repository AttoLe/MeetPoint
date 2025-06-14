import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  template: ` <div class="top-right" (click)="toggleClass()">
      <mat-icon class="clickable">
        {{ theme == 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon
      >
    </div>
    <router-outlet />`,
  styles: `

  .top-right {
    position: fixed;
    top: 25px;
    right: 25px;
    cursor: pointer;
    z-index: 10000;
  }
  `,
})
export class App {
  title = 'MeetPoint.Frontend';
  theme: 'dark' | 'light' = 'dark';

  ngOnInit() {
    document.documentElement.classList.add('dark');
  }

  toggleClass() {
    document.documentElement.classList.remove(this.theme);
    this.theme = this.theme == 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add(this.theme);
  }
}
