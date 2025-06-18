import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthTokenService } from '../auth/auth-token.service';
import { UserService } from '../settings/user.service';

@Injectable({ providedIn: 'root' })
export class SessionHubService {
  private _tokenService = inject(AuthTokenService);
  private _userService = inject(UserService);

  public connection = new signalR.HubConnectionBuilder()
    .withUrl(
      `/hubs/session?userId=${encodeURIComponent(
        this._userService.user()?.id!
      )}`,
      {
        accessTokenFactory: () => this._tokenService.getAccessToken || '',
      }
    )
    .withAutomaticReconnect()
    .build();

  startConnection() {
    return this.connection.start();
  }

  generateSessionToken(): string {
    var uuid = crypto.randomUUID().slice(0, 10);
    return uuid;
  }

  createSession(token: string) {
    this.connection.invoke('CreateSession', token);
  }

  deleteSession(token: string) {
    this.connection.invoke('DeleteSession', token);
  }

  joinSession(token: string) {
    this.connection.invoke('JoinSession', token);
  }

  leaveSession(token: string) {
    this.connection.invoke('LeaveSession', token);
  }
}
