import {Component, computed, inject, output, Signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthResetPassword} from '../../interfaces/auth-reset-password.interface';
import {ActivatedRoute} from '@angular/router';
import {passwordMatchValidator} from '../../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-reset-password-form',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './reset-password-form.html',
  styleUrl: './reset-password-form.css',
})
export class ResetPasswordForm {
  readonly #formBuilder = inject(FormBuilder);
  sendResetPassword = output<AuthResetPassword>();
  readonly #activatedRoute = inject(ActivatedRoute);

  resetPasswordForm: Signal<FormGroup> = computed(() => this.#formBuilder.group({
    token: [this.#activatedRoute.snapshot.queryParams['token']],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required], [passwordMatchValidator('newPassword')]]
  }))

  resetPassword(){
    if (!this.resetPasswordForm().invalid){
      const resetPassword: AuthResetPassword = this.resetPasswordForm().value;
      this.sendResetPassword.emit(resetPassword);
    }
  }
}
