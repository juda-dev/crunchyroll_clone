import { Component } from '@angular/core';
import {LoginForm} from '../../components/login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [
    LoginForm
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
