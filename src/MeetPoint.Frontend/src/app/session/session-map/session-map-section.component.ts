import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SectionHeaderComponent } from '../shared/section-header.component';

@Component({
  selector: 'app-session-map.component',
  imports: [MatIconModule, SectionHeaderComponent],
  template: ` <div style="height: 100%; width: 100%">
    <app-section-header title="Map" (onClick)="openSessionMapPage()" />
    <img
      style="width: 100%; height: 100%; border-radius: 12px"
      src="assets/map.png"
    />
  </div>`,
  styles: `

  :host{
      display: block;
      width: 100%;
      height: 100%;
  }

  .container{
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 10px
  }
`,
})
export class SessionMapSectionComponent {
  openSessionMapPage(): void {
    //router
  }
}
