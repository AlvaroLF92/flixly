import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface AuthUser {
  userName: string;
  passWord: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'authUser';

  private _isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.getAuthStateFromLocalStorage()
  );

  private _userSubject = new BehaviorSubject<AuthUser>(
    this.getUserFromLocalStorage()
  );

  isAuthenticated$: Observable<boolean> =
    this._isAuthenticatedSubject.asObservable();
  userName$: Observable<string> = this._userSubject.asObservable().pipe(
    // Emitimos solo el nombre de usuario
    map((user) => user.userName)
  );

  constructor(private router: Router) {
    // Si no hay credenciales guardadas, se inicializan las por defecto
    if (!localStorage.getItem(this.storageKey)) {
      this.setUserToLocalStorage({ userName: 'user', passWord: '1234' });
    }
  }

  private getUserFromLocalStorage(): AuthUser {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : { userName: 'user', passWord: '1234' };
  }

  private setUserToLocalStorage(user: AuthUser): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this._userSubject.next(user);
  }

  private getAuthStateFromLocalStorage(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  login(credentials: { userName: string; passWord: string }): boolean {
    const storedUser = this.getUserFromLocalStorage();

    const isValid =
      credentials.userName === storedUser.userName &&
      credentials.passWord === storedUser.passWord;

    if (isValid) {
      this._isAuthenticatedSubject.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      this._userSubject.next(storedUser);
      return true;
    }

    return false;
  }

  updateCredentials(newCredentials: AuthUser): void {
    this.setUserToLocalStorage(newCredentials);
  }

  isLoggedIn(): boolean {
    return this._isAuthenticatedSubject.value;
  }

  logOut(): void {
    this._isAuthenticatedSubject.next(false);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): AuthUser {
    return this._userSubject.value;
  }
}
