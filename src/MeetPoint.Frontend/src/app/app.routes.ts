import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { HomeComponent } from './home/home.component';
import { SessionHomeComponent } from './session/session-home/session-home.component';
import { SessionMainComponent } from './session/session-main.component';
import { SettingsMainComponent } from './settings/settings-main.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'session/:token',
    component: SessionMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: SessionHomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'test',
        component: SettingsMainComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
