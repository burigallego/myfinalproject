import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MailValidator } from '../../validators/mail.validator';
import { Store } from '@ngxs/store';
import { Login } from '../../store/auth.actions';

@Component({
  selector: 'el-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store) { }

  getErrorEmail() {
    return this.loginForm.get('email').hasError('required') ? 'You must enter a value' :
      this.loginForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorPassword() {
    return this.loginForm.get('password').hasError('required') ? 'You must enter a value' : '';
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new Login(this.loginForm.value));
    }
  }
}

