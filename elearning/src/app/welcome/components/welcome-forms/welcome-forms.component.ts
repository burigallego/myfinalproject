import { Component } from '@angular/core';

@Component({
  selector: 'el-welcome-forms',
  templateUrl: './welcome-forms.component.html',
  styleUrls: ['./welcome-forms.component.scss']
})
export class WelcomeFormsComponent {
  isRegisterFormVisible = true;

  toggleForm(isRegisterClick: boolean) {
    if (
      (isRegisterClick && this.isRegisterFormVisible) ||
      (!isRegisterClick && !this.isRegisterFormVisible)
    ) {
      return;
    }

    this.isRegisterFormVisible = !this.isRegisterFormVisible;
  }
}

