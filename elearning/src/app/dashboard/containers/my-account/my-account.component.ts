import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthState } from 'src/app/auth/store/auth.state';
import { Profile } from 'src/app/auth/auth.models';
import { UpdateUserProfile } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'el-myaccount',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  @Select(AuthState) user$: Observable<Profile>;

  updateProfileForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      tlf: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.user$.subscribe(({ fullName, preferences }) =>
      this.updateProfileForm.setValue({
        fullName: fullName || '',
        address: '',
        tlf: '',
      })
    );
  }

  updateProfile() {
    if (!this.updateProfileForm.valid) {
      this.markFormGroupTouched(this.updateProfileForm);
      return;
    }

    this.store.dispatch(new UpdateUserProfile(this.updateProfileForm.value));
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

