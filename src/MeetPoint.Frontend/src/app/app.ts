import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class App {
  protected title = 'MeetPoint.Frontend';

  ngOnInit() {
    document.documentElement.classList.add('dark');
    //document.documentElement.classList.add('light');
  }
}
