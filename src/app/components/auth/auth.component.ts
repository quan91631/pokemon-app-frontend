import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, signup } from '../../store/auth/auth.actions';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import {
  selectAuthLoading,
  selectAuthError,
} from 'src/app/store/auth/auth.selector';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  authForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.authForm = this.createForm();
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.authForm = this.createForm();

    if (!this.isLoginMode) {
      this.authForm
        .get('confirmPassword')
        ?.setValidators([
          Validators.required,
          this.passwordMatchValidator.bind(this),
        ]);
    }
  }

  private passwordMatchValidator(control: any) {
    const password = this.authForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const formValue = this.authForm.value;

      if (this.isLoginMode) {
        this.store.dispatch(
          login({
            credentials: {
              username: formValue.username,
              password: formValue.password,
            },
          })
        );
      } else {
        this.store.dispatch(
          signup({
            userData: {
              username: formValue.username,
              password: formValue.password,
              //   confirmPassword: formValue.confirmPassword,
            },
          })
        );
      }
    }
  }
}
