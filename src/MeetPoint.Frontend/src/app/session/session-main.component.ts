import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-session-main.component',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
  ],
  template: ` <mat-sidenav-container style="height: 100%; margin-top: 5vh;">
    <mat-sidenav class="sidenav" mode="side" opened>
      <div class="nav-list">
        @for (item of navItems; track item) {
        <a
          class="item clickable"
          [routerLink]="item.link"
          routerLinkActive="active-link"
        >
          <div class="nav-icon-label">
            <mat-icon> {{ item.icon }}</mat-icon>
            <label class="small clickable" style="padding-top: 5px">
              {{ item.label }}</label
            >
          </div>
        </a>
        }
      </div>
    </mat-sidenav>
    <mat-sidenav-content>
      <div style="margin: 0 3vw 2vh 5px">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>`,
  styles: `

  .sidenav{
    height: 80%;
    width: 6vw;
    margin: 0 auto;
  }

  .nav-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .item {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 25%;
      transition: background-color 0.3s ease;
      cursor: pointer;
      user-select: none;
      background-color: transparent;
      padding: 4px;
  }

  .item.active-link {
    pointer-events: none;
    opacity: 0.8;
  }

  .item:hover:not(.active-link){
    background-color: var(--mat-sys-surface-container-low);
  }

  .active-link{
    background-color: var(--mat-sys-surface-container-low);
  }

  .nav-icon-label{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 50%;
    margin: auto;
  }

  `,
})
export class SessionMainComponent {
  private _route = inject(ActivatedRoute);
  token = this._route.snapshot.paramMap.get('token');

  navItems: NavItem[] = [
    { index: 0, icon: 'home', label: 'Home', link: 'home' },
    { index: 1, icon: 'stars', label: 'Mode', link: 'path' },
    { index: 2, icon: 'person', label: 'People', link: 'path' },
    { index: 3, icon: 'location_on', label: 'Places', link: 'path' },
    { index: 4, icon: 'directions_car', label: 'Routing', link: 'path' },
  ];
}

export interface NavItem {
  index: number;
  icon: string;
  label: string;
  link: string;
}
