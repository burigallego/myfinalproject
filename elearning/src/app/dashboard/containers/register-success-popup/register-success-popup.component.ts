import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'el-register-success-popup',
  templateUrl: './register-success-popup.component.html',
  styleUrls: ['./register-success-popup.component.scss']
})
export class RegisterSuccessPopupComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<RegisterSuccessPopupComponent>) {

  }

  ngOnInit() {
  }

  onClick(): void {
    this.dialogRef.close();
  }
}

