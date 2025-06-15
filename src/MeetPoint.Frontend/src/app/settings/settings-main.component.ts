import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LayoutMainComponent } from '../shared/layout/layout-main.component';
import { MainContentDirective } from '../shared/layout/main-content.directive';
import { NavItem } from '../shared/layout/nav-item-interface';
import { RightSidebarDirective } from '../shared/layout/sidebar/right-sidebar.directive';
import { SidebarNavIconsComponent } from '../shared/layout/sidebar/sidebar-nav-icons.component';

@Component({
  selector: 'app-settings.component',
  standalone: true,
  imports: [
    MatSidenavModule,
    MainContentDirective,
    RightSidebarDirective,
    RouterModule,
    MatIconModule,
    MatCardModule,
    LayoutMainComponent,
    SidebarNavIconsComponent,
  ],
  template: ` <app-layout-main
    [rightSideBarConfig]="{ mode: 'side', toggle: 'open' }"
  >
    <app-sidebar-nav-icons *appRightSidebar />
    <div *appMainContent><h1>AAAAA</h1></div>
  </app-layout-main>`,
  styles: ``,
})
export class SettingsMainComponent {
  navItems: NavItem[] = [];

  form = new FormGroup({
    email: new FormControl('', [Validators.email]),
    username: new FormControl(''),
    phone: new FormControl('', [Validators.pattern('')]), //add validator
    password: new FormGroup({
      current: new FormControl('', [Validators.minLength(6)]),
      new: new FormGroup('', [Validators.minLength(6)]),
    }),
  });
}
