import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-nav-top',
  imports: [MatIconModule],
  template: ` <div class="top-panel">
    <mat-icon
      class="clickable"
      [class.disabled]="!canGoBack"
      (click)="goBack()"
    >
      arrow_back
    </mat-icon>
    <mat-icon class="clickable" (click)="toggleTheme()">
      {{ theme == 'dark' ? 'light_mode' : 'dark_mode' }}
    </mat-icon>
  </div>`,
  styles: `

  .top-panel {
    display: flex;
    justify-content: space-between;
    margin: 2vw;
    align-items: center;
  }

  .clickable.disabled {
    pointer-events: none;
    opacity: 0.3;
    cursor: default;
  }

  `,
})
export class MainNavTopComponent {
  private _router = inject(Router);

  theme: 'dark' | 'light' = 'dark';
  history: string[] = [];

  ngOnInit() {
    document.documentElement.classList.add('dark');

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  get canGoBack(): boolean {
    return this.history.length > 1;
  }

  goBack(): void {
    this.history.pop();
    this._router.navigateByUrl(this.history.pop() || '/');
  }

  toggleTheme(): void {
    document.documentElement.classList.remove(this.theme);
    this.theme = this.theme == 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add(this.theme);
  }
}
