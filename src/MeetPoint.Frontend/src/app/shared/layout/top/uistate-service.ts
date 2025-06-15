import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UIStateService {
  //private _router = inject(Router);

  theme: 'dark' | 'light' = 'dark';
  history: string[] = [];

  constructor(private _router: Router) {
    this.history.push(_router.url);
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });

    console.log('AA', this.history);
    console.log(this.canGoBack);
  }

  get canGoBack(): boolean {
    return this.history.length > 1;
  }

  get isDarkTheme(): boolean {
    return this.theme == 'dark';
  }

  goBack(): void {
    console.log(this.history, this.canGoBack);
    this.history.pop();
    this._router.navigateByUrl(this.history.pop() || '/');
  }

  toggleTheme(): void {
    document.documentElement.classList.remove(this.theme);
    this.theme = this.theme == 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add(this.theme);
  }
}
