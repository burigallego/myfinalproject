import { Component } from '@angular/core';

@Component({
  selector: 'el-resource-forms',
  templateUrl: './resource-forms.component.html',
  styleUrls: ['./resource-forms.component.scss']
})
export class ResourceFormsComponent {
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
