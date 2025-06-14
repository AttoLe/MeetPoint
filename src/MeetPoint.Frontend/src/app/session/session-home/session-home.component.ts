import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SessionMapSectionComponent } from '../session-map/session-map-section.component';
import { SessionParticipantsSectionComponent } from '../session-participants/session-participants-section.component';
import { SessionRoutingsSectionComponent } from '../session-routings/session-routings-section.component';
import { SectionHeaderComponent } from '../shared/page-header.component';

interface GridCellLayout {
  id: string;
  component: any;
  colspan?: number;
  rowspan?: number;
}

@Component({
  imports: [
    MatCardModule,
    MatIconModule,
    DragDropModule,
    NgComponentOutlet,
    SectionHeaderComponent,
  ],
  template: `<app-page-header title="Home">
      <mat-icon class="clickable" (click)="sharelink()"> share </mat-icon>
      <mat-icon class="clickable" (click)="openSessionSettings()">
        settings
      </mat-icon>
    </app-page-header>
    <div
      class="grid"
      [style.grid-template-rows]="gridTemplateRows"
      [style.grid-template-columns]="gridTemplateColumns"
      cdkDropList
      cdkListData="grid"
      (cdkDropListDropped)="onDrop($event)"
    >
      @for (cell of gridLayout.cells; track cell.id){
      <mat-card
        [class]="'card-section ' + (isSquare(cell) ? ' square' : '')"
        [style]="'padding: 25px; maxHeight: ' + getMaxHeight(cell) + ' vh'"
        cdkDrag
        [cdkDragData]="cell"
        [style.gridColumn]="'span ' + (cell.colspan || 1)"
        [style.gridRow]="'span ' + (cell.rowspan || 1)"
      >
        <mat-card
          class="card-section placeholder"
          *cdkDragPlaceholder
        ></mat-card>
        <ng-container [ngComponentOutlet]="cell.component"></ng-container>
      </mat-card>
      }
    </div>`,
  styles: `

  .grid {
    display: grid;
    gap: 1vw;
  }

  .square {
    aspect-ratio: 1 / 1;
    width: 100%;
  }

  .placeholder{
    height: 10vh;
    width: 30vw;
    outline: 1px dotted var(--mat-sys-outline);
  }`,
})
export class SessionHomeComponent {
  gridLayout: { columns: number; rows: number; cells: GridCellLayout[] } = {
    columns: 3,
    rows: 3,
    cells: [
      {
        id: '1',
        component: SessionMapSectionComponent,
        colspan: 2,
        rowspan: 2,
      },
      { id: '2', component: SessionParticipantsSectionComponent },
      { id: '3', component: SessionRoutingsSectionComponent },
      { id: '4', component: SessionParticipantsSectionComponent, colspan: 3 },
    ],
  };

  SquareComponents = [SessionMapSectionComponent];

  get gridTemplateRows(): string {
    return `repeat(${this.gridLayout.rows})`;
  }

  get gridTemplateColumns(): string {
    return `repeat(${this.gridLayout.columns}, 1fr)`;
  }

  getMaxHeight(cell: GridCellLayout): number {
    return (cell.rowspan || 1) * 30;
  }

  isSquare(cell: GridCellLayout): boolean {
    return this.SquareComponents.includes(cell.component);
  }

  onDrop(event: CdkDragDrop<any>) {
    const prevIndex = this.gridLayout.cells.findIndex(
      (c) => c.id === (event.item.data as GridCellLayout).id
    );

    if (prevIndex === -1) return;

    const targetIndex = event.currentIndex;
    const targetComponent = this.gridLayout.cells[targetIndex].component;
    const prevComponent = this.gridLayout.cells[prevIndex].component;

    this.gridLayout.cells[prevIndex].component = targetComponent;
    this.gridLayout.cells[targetIndex].component = prevComponent;
  }

  sharelink(): void {
    //copy link to clipboard
  }

  openSessionSettings(): void {
    //open settigs popup
  }
}
