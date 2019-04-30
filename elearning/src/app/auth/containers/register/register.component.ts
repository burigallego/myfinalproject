import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatchPasswordValidator } from '../../validators/match-pasword.validator';
import { Store, Actions, ofAction } from '@ngxs/store';
import { Register, RegisterSuccess } from '../../store/auth.actions';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'el-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    },
    {
      updateOn: 'blur',
      validators: [MatchPasswordValidator]
    }
  );

  getErrorEmail() {
    return this.registerForm.get('email').hasError('required') ? 'You must enter a value' :
      this.registerForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorPassword() {
    return this.registerForm.get('password').hasError('required') ? 'You must enter a value' : '';
  }

  getErrorName() {
    return this.registerForm.get('fullName').hasError('required') ? 'You must enter a value' : '';
  }

  matcher = new MyErrorStateMatcher();

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.actions$
      .pipe(ofAction(RegisterSuccess))
      .subscribe(() => {
      });
  }

  register() {
    if (!this.registerForm.valid) {
      this.markFormGroupAsTouched(this.registerForm);
      return;
    }
    this.store.dispatch(new Register(this.registerForm.value));
    this.formDirective.resetForm();
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control =>
      control.markAsTouched()
    );
  }


}

