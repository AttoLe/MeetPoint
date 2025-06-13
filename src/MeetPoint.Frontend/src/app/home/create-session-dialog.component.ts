import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TimeFrequency } from '../shared/time-frequency.component';

@Component({
  selector: 'app-create-session-dialog.component',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    TimeFrequency,
  ],
  template: `
    <h2 mat-dialog-title>Create Session</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field appearance="fill">
          <mat-label>Change session token</mat-label>
          <input
            id="token"
            matInput
            formControlName="token"
            type="text"
            maxlength="10"
            [placeholder]="tokenPlaceHolder"
          />
          <mat-hint align="start"> Can be empty </mat-hint>
          <mat-hint align="end">
            {{ form.get('token')?.value?.length ?? tokenPlaceHolder.length }} /
            10
          </mat-hint>
        </mat-form-field>

        <update-time-slider
          [selectedIndex]="1"
          [control]="timeFrequencyControl"
        ></update-time-slider>

        <mat-form-field appearance="fill">
          <mat-label>Add place filters</mat-label>
          <mat-select formControlName="placeFilter" multiple>
            @for (option of placeFilterOptions; track option) {
            <mat-option [value]="option.id">
              {{ option.name }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-checkbox formControlName="allow_others_to_propose_places">
          Allow other participants to propose places
        </mat-checkbox>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="center">
      <button matButton="filled" mat-dialog-close>Go Back</button>
      <button matButton="filled" (click)="create()" [disabled]="form.invalid">
        Create
      </button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class CreateSessionDialog {
  private _dialogRef = inject(MatDialogRef);
  private _router = inject(Router);

  tokenPlaceHolder: string = 'A1B2C3D4E5';
  placeFilterOptions: PlaceTypes[] = [
    { id: 1, name: 'cafe' },
    { id: 2, name: 'restaurant' },
    { id: 3, name: 'shop' },
  ];

  form = new FormGroup({
    token: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    timeFrequency: new FormControl(),
    placeFilter: new FormControl<PlaceTypes[]>([]),
    allow_others_to_propose_places: new FormControl(false),
  });

  ngOnInit() {
    //set values??
  }

  get timeFrequencyControl(): FormControl {
    return this.form.get('timeFrequency') as FormControl;
  }

  create(): void {
    //create session, hub with service and signalr
    //if no filter give all or nothig??
    //copy link to clipboard
    if (this.form.value.token == '')
      this.form.get('token')?.setValue(this.tokenPlaceHolder);

    this._dialogRef.close(/*data??*/);
    this._router.navigate([`/session`, this.form.value.token]);
  }
}

export interface PlaceTypes {
  id: number;
  name: string;
}
