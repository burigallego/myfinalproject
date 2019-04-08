import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatchPasswordValidator } from '../../validators/match-pasword.validator';
import { MailValidator } from '../../validators/mail.validator';
import { Store, Actions, ofAction } from '@ngxs/store';
import { Register, RegisterSuccess } from '../../store/auth.actions';

@Component({
  selector: 'el-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      updateOn: 'blur',
      validators: [MatchPasswordValidator]
    }
  );

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.actions$
      .pipe(ofAction(RegisterSuccess))
      .subscribe(() => this.registerForm.reset());
  }

  register() {
    if (!this.registerForm.valid) {
      this.markFormGroupAsTouched(this.registerForm);
      return;
    }
    this.store.dispatch(new Register(this.registerForm.value));
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control =>
      control.markAsTouched()
    );
  }
}

