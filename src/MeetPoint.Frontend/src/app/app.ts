import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `<router-outlet />`,
  styles: ``,
})
export class App {
  ngOnInit() {
    document.documentElement.classList.add('dark');
  }
}
