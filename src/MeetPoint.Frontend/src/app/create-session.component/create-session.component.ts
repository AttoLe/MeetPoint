import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { UpdateTimeSliderComponent } from '../shared/update-time-slider.component';

@Component({
  selector: 'app-create-session.component',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    UpdateTimeSliderComponent,
    MatCardModule,
  ],
  template: ` <h2 mat-dialog-title style="margin: auto">Create Session</h2>
    <mat-dialog-content style="display: flex; flex-direction: column;">
      <mat-form-field
        appearance="fill"
        style="width: 100%; padding-bottom: 20px"
      >
        <mat-label>Change session token</mat-label>
        <input
          matInput
          type="text"
          [placeholder]="this.token() ?? 'Enter token'"
          [(ngModel)]="this.token"
          minlength="10"
          maxlength="10"
          required
        />
        <mat-hint align="start"> auto, but can be manual </mat-hint>
        <mat-hint align="end">{{ token()?.length }} / 10</mat-hint>

        @if (token()?.length != 10) {
        <mat-error>Token must be exactly 10 characters long.</mat-error>
        }
      </mat-form-field>

      <update-time-slider
        style="padding-bottom: 20px"
        [selectedIndex]="1"
        (OnChange)="updateTime()"
      ></update-time-slider>

      <mat-form-field appearance="fill">
        <mat-label>Add place filters</mat-label>
        <mat-select [(ngModel)]="chosen_options" multiple>
          @for (option of options; track option) {
          <mat-option [value]="option.id">
            {{ option.name }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-checkbox [checked]="_allow_others_to_propose_places()">
        Allow other participants to propose places
      </mat-checkbox>

      <mat-dialog-actions align="center">
        <button matButton="filled" mat-dialog-close="" style="width: 75px">
          Go Back
        </button>
        <button
          matButton="filled"
          (click)="create()"
          [disabled]="token()?.length != 10"
          style="width: 75px"
        >
          Create
        </button>
      </mat-dialog-actions>
    </mat-dialog-content>`,
})
export class CreateSessionComponent {
  token = model<string>();
  updateTime = model<string>('');
  options: PlaceTypes[] = [];
  chosen_options = model<PlaceTypes[]>();
  readonly _allow_others_to_propose_places = signal(false);

  private _dialogRef = inject(MatDialogRef);
  private _router = inject(Router);

  ngOnInit() {
    //placeholder
    this.token.set('1A2B3C4D5E');
    this.options = [
      { id: 1, name: 'cafe' },
      { id: 2, name: 'restaurant' },
      { id: 3, name: 'shop' },
    ];
  }

  create(): void {
    //create session, hub with service and signalr
    //copy link to clipboard
    this._router.navigate([`/session`, this.token()]);
    this._dialogRef.close(/*data??*/);
  }
}

export interface PlaceTypes {
  id: number;
  name: string;
}
