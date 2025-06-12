import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { CreateSessionComponent } from '../create-session.component/create-session.component';
import { JoinSessionComponent } from '../join-session.component/join-session.component';
import { TileConfig } from './TileConfig';

@Component({
  selector: 'app-home.component',
  imports: [MatCardModule, MatGridListModule],
  template: `<div class="container">
    <mat-grid-list
      [cols]="totalCols()"
      rowHeight="25vh"
      style="width: 80%; margin:  30vh auto 0 auto;"
      gutterSize="5px"
    >
      @for (tile of tileConfigs(); track tile) {
      <mat-grid-tile [colspan]="tile.span" (click)="tile.onClick()">
        <mat-card class="section">
          <mat-card-footer style="height: 40%; padding: 0 1rem;">
            <mat-card-title>
              <h3>{{ tile.title }}</h3>
            </mat-card-title>
            <mat-card-subtitle>{{ tile.desc }}</mat-card-subtitle>
          </mat-card-footer>
        </mat-card>
      </mat-grid-tile>
      }
    </mat-grid-list>
  </div>`,
  styles: `

    .container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .section{
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      justify-content:flex-end
    }

    .mat-grid-tile {
      transition: transform 0.5s ease;
    }

    .mat-grid-tile:hover {
        transform: scale(1.05);
    }`,
})
export class HomeComponent {
  private _dialog = inject(MatDialog);
  private _router = inject(Router);

  tiles = signal<TileConfig[]>([
    {
      span: 6,
      title: 'Create session',
      desc: 'Create session as an owner',
      onClick: () =>
        this._dialog.open(CreateSessionComponent, {
          width: '300px',
          height: '450px',
          autoFocus: 'dialog',
        }),
    },
    {
      span: 6,
      title: 'Join session',
      desc: 'Join existing session as a participant',
      onClick: () =>
        this._dialog.open(JoinSessionComponent, {
          width: '300px',
          height: '350px',
          autoFocus: 'dialog',
        }),
    },
    {
      span: 3,
      title: 'Settings',
      onClick: () => this.onSettingsClick(),
    },
  ]);

  totalCols = computed(() =>
    this.tiles().reduce((sum, tile) => sum + tile.span, 0)
  );

  tileConfigs = computed(() => {
    let offset = 0;
    return this.tiles().map((tile) => {
      const result = { ...tile, offset };
      offset += tile.span;
      return result;
    });
  });

  onSettingsClick() {
    console.log('SETTINGS');
    //this.router.navigate(['/settings']);
  }
}
