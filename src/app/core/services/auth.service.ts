import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.getAuthStateFromLocalStorage()
  );
  private _userNameSubject = new BehaviorSubject<string>(
    localStorage.getItem('userName') || ''
  );

  isAuthenticated$: Observable<boolean> =
    this._isAuthenticatedSubject.asObservable();
  userName$: Observable<string> = this._userNameSubject.asObservable();

  constructor(public router: Router) {}

  private getAuthStateFromLocalStorage(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  login({
    userName,
    passWord,
  }: {
    userName: string;
    passWord: string;
  }): boolean {
    const defaultUserName = 'user';
    const defaultPassWord = '1234';

    if (userName === defaultUserName && passWord === defaultPassWord) {
      this._isAuthenticatedSubject.next(true);
      this._userNameSubject.next(userName);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', userName);
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  updateUserName(newUserName: string): void {
    localStorage.setItem('userName', newUserName);
    this._userNameSubject.next(newUserName);
  }

  isLoggedIn(): boolean {

    return this._isAuthenticatedSubject.value;
  }

  logOut(): void {
    this._isAuthenticatedSubject.next(false);
    this._userNameSubject.next('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
