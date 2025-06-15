import { CommonModule } from '@angular/common';
import { Component, contentChild, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MainContentDirective } from './main-content.directive';
import { LeftSidebarDirective } from './sidebar/left-sidebar.directive';
import { RightSidebarDirective } from './sidebar/right-sidebar.directive';
import { SideNavConfig } from './sidebar/sidenav-config-interface';
import { NavTopComponent } from './top/nav-top.component';
import { TopbarDirective } from './top/topbar.directive';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    NavTopComponent,
  ],
  template: `
    <ng-container
      [ngTemplateOutlet]="topNavBar()?.templateRef || defaultTopBar"
    />
    <mat-sidenav-container style="height: 100hv;">
      @if(leftSideBar()){
      <mat-sidenav
        [mode]="leftSideBarConfig()?.mode || 'side'"
        [opened]="leftSideBarConfig()?.toggle || 'opened'"
        position="start"
        [style]="leftSideBarConfig()?.style"
      >
        <ng-container [ngTemplateOutlet]="leftSideBar()?.templateRef" />
      </mat-sidenav>
      } @if(rightSideBar()){
      <mat-sidenav
        [mode]="rightSideBarConfig()?.mode || 'side'"
        [opened]="rightSideBarConfig()?.toggle || 'opened'"
        position="end"
        [style]="rightSideBarConfig()?.style"
      >
        <ng-container [ngTemplateOutlet]="rightSideBar()?.templateRef" />
      </mat-sidenav>
      }
      <mat-sidenav-content>
        <ng-component
          style="padding: 0 1vw; display: flex;"
          [ngTemplateOutlet]="mainContent().templateRef"
        ></ng-component>
      </mat-sidenav-content>
    </mat-sidenav-container>

    <ng-template #defaultTopBar><app-nav-top /> </ng-template>
  `,
  styles: ``,
})
export class LayoutMainComponent {
  topNavBar = contentChild(TopbarDirective);
  rightSideBar = contentChild(RightSidebarDirective);
  rightSideBarConfig = input<SideNavConfig>();
  leftSideBar = contentChild(LeftSidebarDirective);
  leftSideBarConfig = input<SideNavConfig>();
  mainContent = contentChild.required(MainContentDirective);

  ngOnInit() {
    console.log();
  }
}
