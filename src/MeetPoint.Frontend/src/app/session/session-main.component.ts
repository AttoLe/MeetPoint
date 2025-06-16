import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LayoutMainComponent } from '../shared/layout/layout-main.component';
import { MainContentDirective } from '../shared/layout/main-content.directive';
import { NavItem } from '../shared/layout/nav-item-interface';
import { LeftSidebarDirective } from '../shared/layout/sidebar/left-sidebar.directive';
import { SidebarNavIconsComponent } from '../shared/layout/sidebar/sidebar-nav-icons.component';

@Component({
  selector: 'app-session-main.component',
  imports: [
    MatSidenavModule,
    LeftSidebarDirective,
    MainContentDirective,
    MatIconModule,
    MatCardModule,
    LayoutMainComponent,
    SidebarNavIconsComponent,
    RouterModule,
  ],
  template: ` <app-layout-main>
    <app-sidebar-nav-icons
      *appLeftSidebar="{ style: 'width: 6vw' }"
      [navItems]="navItems"
      [toggle]="{ position: 'start', icon: 'arrow_drop_down' }"
    />
    <ng-container *appMainContent />
  </app-layout-main>`,
  styles: ``,
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
