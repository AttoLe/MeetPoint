import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-session-map.component',
  imports: [MatIconModule],
  template: `<div style="height: 100%; width: 100%">
    <div class="header-split" style="padding-bottom: 10px">
      <div style="display: flex; gap: 0.75rem;">
        <h3 class="clickable" style="font-size: 20px; margin: 0 !important">
          Map preview
        </h3>
        <mat-icon class="clickable" style="margin: auto">
          arrow_forward
        </mat-icon>
      </div>
      <mat-icon class="clickable"> list </mat-icon>
    </div>
    <img
      style="width: 100%; height: 90%; border-radius: 12px"
      src="assets/map.png"
    />
  </div>`,
  styles: `

  :host{
      display: block;
      width: 100%;
      height: 800px;
  }`,
})
export class SessionMapComponent {}
