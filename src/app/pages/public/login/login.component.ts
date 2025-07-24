import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SharedModule } from '../../../core/shared/shared.module';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginError = false;
  isLoading = false;

  defaultUsername: string = '';
  defaultPassword: string = '';

  private userSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userSub = this.authService.userName$.subscribe((userName) => {
      this.defaultUsername = userName;
      this.loginForm.patchValue({ userName });
    });
    const currentUser = this.authService.getCurrentUser();
    this.defaultPassword = currentUser.passWord;
    this.loginForm.patchValue({ passWord: this.defaultPassword });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
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
          this.isLoading = false;

          if (isLoggedIn) {
            this.router.navigate(['/home']);
          } else {
            this.loginError = true;
          }
        });
    }
  }
}
