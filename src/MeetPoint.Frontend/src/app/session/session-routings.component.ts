import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-session-routings.component',
  imports: [MatIconModule],
  template: `<div style="height: 100%; width: 100%">
    <div class="header-split" style="padding-bottom: 10px">
      <div style="display: flex; gap: 0.75rem;">
        <h3 class="clickable" style="font-size: 20px; margin: 0 !important">
          Routes
        </h3>
        <mat-icon class="clickable" style="margin: auto">
          arrow_forward
        </mat-icon>
      </div>
      <mat-icon class="clickable"> list </mat-icon>
    </div>
    <div class="carousele">
      <div class="image-grid">
        @for (route of [1, 2, 3, 4]; track route){
        <img class="image-container" src="assets/route{{ route }}.png" />
        }
      </div>
    </div>
  </div>`,
  styles: `

  .carousele{
    height: 50%;
    display: flex;
    gap: 4rem;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    margin: auto
  }

.image-grid {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 0.5rem;
  }
}

  .image-container{
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .route:hover{
    transform: scale(1.05);
  }

  :host{
      display: block;
      width: 100%;
      height: 100%;
  }`,
})
export class SessionRoutingsComponent {
  openRoute(): void {
    //open route popup ??
  }
}
