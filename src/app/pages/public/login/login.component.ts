import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SharedModule } from '../../../core/shared/shared.module';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;
  isLoading = false;

  defaultUsername: string;
  defaultPassword: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
    });

    this.defaultUsername = 'user';
    this.defaultPassword = '1234';
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get passWord() {
    return this.loginForm.get('passWord');
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { userName, passWord } = this.loginForm.value;

      of(this.authService.login({ userName, passWord }))
        .pipe(delay(2000))
        .subscribe((isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(['/dashboard']);
            this.isLoading = false;
            console.log('Te has logeado correctamente');
          } else {
            this.loginError = true;
            this.isLoading = false;
            console.log('Ha habido un problema con el login');
          }
        });
    }
  }
}
