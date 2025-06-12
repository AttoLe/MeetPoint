import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterModule,
  ],

  template: ` <div style="width: 20%; margin: 30vh auto 0 auto;">
    <mat-card class="section" style="height: 35vh; width: 15vw">
      <h2 class="header">Login</h2>
      <form [formGroup]="form" style="gap: 20px; padding: 0 24px">
        <mat-dialog-content
          style="display: flex; flex-direction: column; height: 100%"
        >
          <mat-form-field appearance="fill">
            <mat-label>Enter email</mat-label>
            <input
              matInput
              type="email"
              formControlName="email"
              placeholder="email@gmail.com"
            />
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Enter password</mat-label>
            <input matInput type="password" formControlName="password" />
          </mat-form-field>

          <mat-checkbox [checked]="remember_me()" style="padding-bottom: 20px">
            Rememer me
          </mat-checkbox>

          <div
            style="display: flex; justify-content: center;
            flex-shrink: 0; flex-wrap: wrap; align-items: center;box-sizing: border-box;"
          >
            <button
              matButton="outlined"
              [routerLink]="['/register']"
              style="padding: 16px 24px; width: 75px; margin: auto;"
            >
              New user
            </button>

            <button
              type="submit"
              matButton="filled"
              (click)="login()"
              [disabled]="form.invalid"
              style="padding: 16px 24px; width: 75px; margin: auto;"
            >
              Login
            </button>
          </div>
        </mat-dialog-content>
      </form>
    </mat-card>
  </div>`,
  styles: `

  .header{
    font-family: var(--mat-sys-headline-small-font, inherit);
    line-height: var(--mat-sys-headline-small-line-height, 1.5rem);
    font-size: var(--mat-sys-headline-small-size, 1rem);
    font-weight: var(--mat-sys-headline-small-weight, 400);
    letter-spacing: var(--mat-sys-headline-small-tracking, 0.03125em);
    display: block;
    position: relative;
    flex-shrink: 0;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 20px 30px 10px;
  }`,
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  remember_me = signal<boolean>(false);

  private _router = inject(Router);

  login(): void {
    //login
    //user id
    this._router.navigate(['/home']);
  }
}
