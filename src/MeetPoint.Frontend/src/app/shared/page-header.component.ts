import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  imports: [MatIconModule],
  template: ` <div class="header-split">
    <h1>{{ title() }}</h1>
    <div class="container clickable">
      <ng-content></ng-content>
    </div>
  </div>`,
  styles: `

  .header-split {
    margin: 0 10px 25px 10px;
  }

  .container {
    display: flex;
    gap: 0.75rem;
  }

  .clickable {
      margin: auto 0;
  }`,
})
export class SectionHeaderComponent {
  title = input.required<string>();
}
