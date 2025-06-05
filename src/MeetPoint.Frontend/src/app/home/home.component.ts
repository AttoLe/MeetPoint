import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home.component',
  imports: [MatGridListModule],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);

  tiles = signal([
    {
      span: 5,
      title: 'Create session',
      desc: 'Create session as an owner',
      onClick: () => this.onCreateClick(),
    },
    {
      span: 5,
      title: 'Join session',
      desc: 'Join existing session as a participant',
      onClick: () => this.onJoinClick(),
    },
    {
      span: 2,
      title: 'Settings',
      desc: '',
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

  onCreateClick() {
    console.log('CREATE');
    /*this.dialog.open(FirstPopupComponent, {
      width: '400px',
    });*/
  }

  onJoinClick() {
    console.log('JOIN');
    /*this.dialog.open(SecondPopupComponent, {
      width: '400px',
    });*/
  }

  onSettingsClick() {
    console.log('SETTINGS');
    //this.router.navigate(['/settings']);
  }
}
