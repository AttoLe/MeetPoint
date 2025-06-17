import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';

export interface UserDto {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface FriendDto {
  id: string;
  username: string;
  phoneNumber: string | null;
}

export interface UpdateDto {
  userName: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http = inject(HttpClient);
  public readonly user = signal<UserDto | null>(null);

  constructor() {
    effect(() => this.getUserData().subscribe());
    console.log('AFTER CONSTRUCTOR', this.user);
  }

  getUserData(): Observable<UserDto> {
    return this._http
      .get<UserDto>('api/account/me')
      .pipe(tap((res) => this.user.set(res)));
  }

  //change later to more data field or separate it
  setUserData(dto: UpdateDto): Observable<any> {
    return this._http.put('/api/account/update', dto);
  }

  setUserDataAndReload(dto: UpdateDto): Observable<UserDto> {
    return this.setUserData(dto).pipe(switchMap(() => this.getUserData()));
  }

  checkPassword(password: string): Observable<any> {
    return this._http.post<void>('/api/account/check-password', password);
  }
}
