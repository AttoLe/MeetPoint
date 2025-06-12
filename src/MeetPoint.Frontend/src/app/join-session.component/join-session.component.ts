import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UpdateTimeSliderComponent } from '../shared/update-time-slider.component';

@Component({
  selector: 'app-join-session.component',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    UpdateTimeSliderComponent,
  ],
  template: `<h2 mat-dialog-title style="margin: auto; height: 60px;">
      Join Session
    </h2>
    <mat-dialog-content style="display: flex; flex-direction: column;">
      <mat-form-field
        appearance="fill"
        style="width: 100%; padding-bottom: 20px"
      >
        <mat-label>Insert session token</mat-label>
        <input
          matInput
          type="text"
          [placeholder]="this.token() ?? 'Enter token'"
          [(ngModel)]="this.token"
          minlength="10"
          maxlength="10"
          required
        />
        <mat-hint align="end">{{ token()?.length }} / 10</mat-hint>

        @if (token()?.length != 10) {
        <mat-error>Token must be exactly 10 characters long.</mat-error>
        }
      </mat-form-field>
      <update-time-slider [selectedIndex]="1" (OnChange)="updateTime()">
      </update-time-slider>
    </mat-dialog-content>

    <mat-dialog-actions align="center">
      <button matButton="filled" mat-dialog-close="" style="width: 75px">
        Go Back
      </button>
      <button
        matButton="filled"
        (click)="join()"
        [disabled]="token()?.length != 10"
        style="width: 75px"
      >
        Join
      </button>
    </mat-dialog-actions> `,
})
export class JoinSessionComponent {
  token = model<string>();
  updateTime = model<string>('');

  private _dialogRef = inject(MatDialogRef);
  private _router = inject(Router);

  join(): void {
    //join session, hub with service and signalr
    this._router.navigate([`/session`, this.token()]);
    this._dialogRef.close(/*data??*/);
  }
}

//add outline to popup and blur background??
//set update time as host??
