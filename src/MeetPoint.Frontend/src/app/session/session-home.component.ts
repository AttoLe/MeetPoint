import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgComponentOutlet } from '@angular/common';
import { Component, Type } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SessionMapComponent } from './session-map.component';
import { SessionParticipantsComponent } from './session-participants.component';
import { SessionRoutingsComponent } from './session-routings.component';

@Component({
  imports: [MatCard, MatIconModule, DragDropModule, NgComponentOutlet],
  template: `<div class="header-split" style="margin: 0 10px 25px 10px;">
      <h1 style="margin: 0 !important">Home</h1>
      <div style="display: flex; gap: 0.75rem;">
        <mat-icon class="clickable" (click)="sharelink()"> share </mat-icon>
        <mat-icon class="clickable" (click)="openSessionSettings()">
          settings
        </mat-icon>
      </div>
    </div>

    <div
      cdkDropList
      class="sections-container"
      cdkDropListOrientation="horizontal"
      (cdkDropListDropped)="drop($event)"
    >
      @for (section of sections; track section){
      <mat-card class="section" cdkDrag>
        <mat-card class="section placeholder" *cdkDragPlaceholder></mat-card>
        <ng-container *ngComponentOutlet="section"></ng-container>
      </mat-card>
      }
    </div>`,
  styles: `

  .section{
    padding: 25px;
  }

  .placeholder{
    background: var(--mat-sys-surface-container-low);
  }`,
})
export class SessionHomeComponent {
  sections: Array<Type<any>> = [
    SessionMapComponent,
    SessionParticipantsComponent,
    SessionRoutingsComponent,
  ];

  sharelink(): void {
    //copy link to clipboard
  }

  openSessionSettings(): void {
    //open settigs popup
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }
}
