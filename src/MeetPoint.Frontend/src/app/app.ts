import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { UIStateService } from './shared/layout/top/uistate-service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  template: `<router-outlet />`,
  styles: ``,
})
export class App {
  _iuService = inject(UIStateService);
  _authService = inject(AuthService);
}
