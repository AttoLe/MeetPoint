import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService, UserDto } from '../auth/auth.service';

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
  private http = inject(HttpClient);
  public user = inject(AuthService).user;

  updateUser(dto: UpdateDto): Observable<any> {
    return this.http
      .put('/api/account/update', dto)
      .pipe(catchError((error) => throwError(() => error)));
  }

  getFriends(): Observable<UserDto[]> {
    return this.http
      .get<UserDto[]>('/api/account/friends')
      .pipe(catchError((error) => throwError(() => error)));
  }

  deleteFriend(id: string): Observable<any> {
    return this.http.delete(`/api/account/friends/delete${id}`);
  }

  getReceivedIntvites(): Observable<UserDto[]> {
    return this.http
      .get<UserDto[]>('/api/account/invites/received')
      .pipe(catchError((error) => throwError(() => error)));
  }

  getSentInvites(): Observable<UserDto[]> {
    return this.http
      .get<UserDto[]>('/api/account/intives/send')
      .pipe(catchError((error) => throwError(() => error)));
  }

  sentInvite(id: string): Observable<void> {
    return this.http
      .post<void>(`/api/account/invite/send${id}`, null)
      .pipe(catchError((error) => throwError(() => error)));
  }

  rejectInvite(id: string): Observable<void> {
    return this.http
      .post<void>(`/api/account/invite/reject${id}`, null)
      .pipe(catchError((error) => throwError(() => error)));
  }

  acceptInvite(id: string): Observable<void> {
    return this.http
      .post<void>(`/api/account/invite/accept${id}`, null)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
