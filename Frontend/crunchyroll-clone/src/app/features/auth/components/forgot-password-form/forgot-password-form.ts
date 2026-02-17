import {Component, computed, inject, output, Signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password-form.html',
  styleUrl: './forgot-password-form.css',
})
export class ForgotPasswordForm {
  readonly #formBuilder = inject(FormBuilder);
  sendForgotPassword = output<string>();

  forgotPasswordForm: Signal<FormGroup> = computed(() =>
    this.#formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    })
  )

  forgotPassword(){
    if (!this.forgotPasswordForm().invalid){
      const forgotPassword = this.forgotPasswordForm().value;
      this.sendForgotPassword.emit(forgotPassword);
    }
  }
}
